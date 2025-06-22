import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearCart, CartItem } from '../../slices/cartSlice';
import { showNotification } from '../../slices/uiSlice';
import { createOrder } from '../../firebase/firebase';

// Use the CartItem type from cartSlice
type CartItemType = CartItem;

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface StripeCheckoutProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onCancel: () => void;
}

// Mock Stripe component
const StripeCheckout: React.FC<StripeCheckoutProps> = ({ amount, onSuccess, onCancel }) => {
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful payment
    setTimeout(() => {
      onSuccess('mock_payment_id_12345');
    }, 1500);
  };

  return (
    <PaymentForm onSubmit={handlePayment}>
      <CardInputGroup>
        <Label>Card Number</Label>
        <Input 
          type="text" 
          placeholder="1234 5678 9012 3456" 
          required 
        />
      </CardInputGroup>
      
      <FormRow>
        <FormGroup>
          <Label>Expiration Date</Label>
          <Input 
            type="text" 
            placeholder="MM/YY" 
            required 
          />
        </FormGroup>
        
        <FormGroup>
          <Label>CVC</Label>
          <Input 
            type="text" 
            placeholder="123" 
            required 
          />
        </FormGroup>
      </FormRow>
      
      <SubmitButton type="submit">Pay ${amount.toFixed(2)}</SubmitButton>
      <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
    </PaymentForm>
  );
};

const CheckoutPage: React.FC<{}> = () => {
  const [step, setStep] = useState<number>(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to products if cart is empty
    if (items.length === 0) {
      navigate('/products');
    }
  }, [items, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to payment step
  };
  
  const handlePaymentSuccess = async (paymentId: string) => {
    setPaymentProcessing(true);
    
    try {
      // Create order in Firebase
      if (isLoggedIn && user) {
        await createOrder({
          userId: user.uid,
          items: items,
          shippingAddress: shippingInfo,
          totalAmount,
          paymentId,
          status: 'processing',
          createdAt: new Date().toISOString()
        });
      }
      
      // Clear cart
      dispatch(clearCart());
      
      // Show success message
      dispatch(showNotification({
        message: 'Order placed successfully!',
        type: 'success'
      }));
      
      // Navigate to order confirmation
      navigate('/');
    } catch (error) {
      dispatch(showNotification({
        message: 'Failed to place order. Please try again.',
        type: 'error'
      }));
    } finally {
      setPaymentProcessing(false);
    }
  };
  
  const handlePaymentCancel = () => {
    setStep(1); // Go back to shipping info
  };
  
  if (items.length === 0) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <CheckoutTitle>Checkout</CheckoutTitle>
      
      <CheckoutContent>
        <CheckoutMain>
          <ProgressSteps>
            <Step active={step >= 1}>1. Shipping Information</Step>
            <Step active={step >= 2}>2. Payment</Step>
          </ProgressSteps>
          
          {step === 1 && (
            <ShippingForm onSubmit={handleShippingSubmit}>
              <SectionTitle>Shipping Address</SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label>Street Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit">
                Continue to Payment
              </SubmitButton>
            </ShippingForm>
          )}
          
          {step === 2 && (
            <PaymentSection>
              <SectionTitle>Payment Information</SectionTitle>
              <p>Complete your purchase by providing your payment details</p>
              
              {paymentProcessing ? (
                <ProcessingMessage>
                  Processing your payment...
                </ProcessingMessage>
              ) : (
                <StripeCheckout
                  amount={totalAmount}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                />
              )}
            </PaymentSection>
          )}
        </CheckoutMain>
        
        <OrderSummary>
          <SectionTitle>Order Summary</SectionTitle>
          
          <OrderItemsList>
            {items.map((item) => (
              <OrderItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemQty>Qty: {item.quantity}</ItemQty>
                </ItemInfo>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </OrderItem>
            ))}
          </OrderItemsList>
          
          <Divider />
          
          <TotalRow>
            <TotalLabel>Subtotal</TotalLabel>
            <TotalValue>${totalAmount.toFixed(2)}</TotalValue>
          </TotalRow>
          
          <TotalRow>
            <TotalLabel>Shipping</TotalLabel>
            <TotalValue>Free</TotalValue>
          </TotalRow>
          
          <TotalRow bold>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>${totalAmount.toFixed(2)}</TotalValue>
          </TotalRow>
        </OrderSummary>
      </CheckoutContent>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CheckoutTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
`;

const CheckoutContent = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const CheckoutMain = styled.div`
  flex: 1;
`;

const ProgressSteps = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

interface StepProps {
  active: boolean;
}

const Step = styled.div<StepProps>`
  padding: 15px 20px;
  color: ${props => props.active ? '#b38a5c' : '#999'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-bottom: ${props => props.active ? '2px solid #b38a5c' : 'none'};
  margin-right: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
`;

const ShippingForm = styled.form`
  margin-top: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #b38a5c;
  }
`;

const SubmitButton = styled.button`
  background-color: #b38a5c;
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #a07a4c;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #666;
  border: 1px solid #e0e0e0;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const PaymentSection = styled.div`
  margin-top: 20px;
`;

const PaymentForm = styled.form`
  margin-top: 20px;
`;

const CardInputGroup = styled(FormGroup)``;

const ProcessingMessage = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 18px;
  color: #666;
`;

const OrderSummary = styled.div`
  width: 350px;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  align-self: flex-start;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OrderItemsList = styled.div`
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ItemQty = styled.div`
  font-size: 12px;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #333;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

interface TotalRowProps {
  bold?: boolean;
}

const TotalRow = styled.div<TotalRowProps>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${props => props.bold ? '18px' : '16px'};
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const TotalLabel = styled.span`
  color: #333;
`;

const TotalValue = styled.span`
  color: #b38a5c;
  font-weight: 600;
`;

export default CheckoutPage;
