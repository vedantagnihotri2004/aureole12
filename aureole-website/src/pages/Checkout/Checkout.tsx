import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Container = styled.div`
  padding: 40px 0;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Times New Roman', serif;
`;

const CheckoutLayout = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const CheckoutForm = styled.div`
  flex: 3;
`;

const OrderSummary = styled.div`
  flex: 2;
  background-color: #f8f2ea;
  border-radius: 8px;
  padding: 30px;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Times New Roman', serif;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #c49a6c;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: #c49a6c;
    outline: none;
  }
`;

const RadioGroup = styled.div`
  margin-top: 10px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    border-color: #c49a6c;
  }
  
  &.selected {
    border-color: #c49a6c;
    background-color: #f8f2ea;
  }
`;

const Radio = styled.input`
  margin-right: 8px;
`;

const PaymentLogo = styled.div`
  margin-left: auto;
  
  img {
    height: 24px;
  }
`;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`;

const CartItemPrice = styled.p`
  font-size: 14px;
  color: #666;
`;

const CartItemQuantity = styled.p`
  font-size: 14px;
  color: #666;
`;

const OrderTotal = styled.div`
  margin-top: 20px;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  
  &.total {
    border-top: 1px solid #e0e0e0;
    margin-top: 10px;
    padding-top: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

// Sample cart items for demonstration
const cartItems = [
  { id: 1, name: "Vanilla & Cedar", price: 35, quantity: 1, image: "https://placehold.co/600x400/e9d9c8/333333?text=Auréole+Candle" },
  { id: 5, name: "Summer Breeze", price: 28.80, originalPrice: 36, quantity: 2, image: "https://placehold.co/600x400/e9d9c8/333333?text=Auréole+Candle" }
];

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15 : 5;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  return (
    <Container>
      <PageTitle>Checkout</PageTitle>
      
      <CheckoutLayout>
        <CheckoutForm>
          <FormSection>
            <SectionTitle>Shipping Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <Label>First Name</Label>
                <Input type="text" placeholder="John" />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input type="text" placeholder="Doe" />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label>Email Address</Label>
                <Input type="email" placeholder="john.doe@example.com" />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="(123) 456-7890" />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label>Address</Label>
                <Input type="text" placeholder="123 Main St" />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label>City</Label>
                <Input type="text" placeholder="New York" />
              </FormGroup>
              <FormGroup>
                <Label>State</Label>
                <Select>
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>ZIP Code</Label>
                <Input type="text" placeholder="10001" />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Shipping Method</SectionTitle>
            <RadioGroup>
              <RadioOption 
                className={shippingMethod === 'standard' ? 'selected' : ''}
                onClick={() => setShippingMethod('standard')}
              >
                <Radio 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
                <div>
                  <strong>Standard Shipping</strong>
                  <p>Delivery in 5-7 business days</p>
                </div>
                <strong>$5.00</strong>
              </RadioOption>
              
              <RadioOption 
                className={shippingMethod === 'express' ? 'selected' : ''}
                onClick={() => setShippingMethod('express')}
              >
                <Radio 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'express'} 
                  onChange={() => setShippingMethod('express')}
                />
                <div>
                  <strong>Express Shipping</strong>
                  <p>Delivery in 2-3 business days</p>
                </div>
                <strong>$15.00</strong>
              </RadioOption>
            </RadioGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Payment Method</SectionTitle>
            <RadioGroup>
              <RadioOption 
                className={paymentMethod === 'credit-card' ? 'selected' : ''}
                onClick={() => setPaymentMethod('credit-card')}
              >
                <Radio 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'credit-card'} 
                  onChange={() => setPaymentMethod('credit-card')}
                />
                <div>
                  <strong>Credit Card</strong>
                </div>
                <PaymentLogo>
                  <img src="https://placehold.co/120x24/e9d9c8/333333?text=Cards" alt="Credit Cards" />
                </PaymentLogo>
              </RadioOption>
              
              <RadioOption 
                className={paymentMethod === 'paypal' ? 'selected' : ''}
                onClick={() => setPaymentMethod('paypal')}
              >
                <Radio 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'paypal'} 
                  onChange={() => setPaymentMethod('paypal')}
                />
                <div>
                  <strong>PayPal</strong>
                </div>
                <PaymentLogo>
                  <img src="https://placehold.co/80x24/e9d9c8/333333?text=PayPal" alt="PayPal" />
                </PaymentLogo>
              </RadioOption>
            </RadioGroup>
            
            {paymentMethod === 'credit-card' && (
              <>
                <FormRow>
                  <FormGroup>
                    <Label>Card Number</Label>
                    <Input type="text" placeholder="1234 5678 9012 3456" />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Cardholder Name</Label>
                    <Input type="text" placeholder="John Doe" />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Expiration Date</Label>
                    <Input type="text" placeholder="MM/YY" />
                  </FormGroup>
                  <FormGroup>
                    <Label>CVV</Label>
                    <Input type="text" placeholder="123" />
                  </FormGroup>
                </FormRow>
              </>
            )}
          </FormSection>
        </CheckoutForm>
        
        <OrderSummary>
          <SectionTitle>Order Summary</SectionTitle>
          
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <CartItemImage>
                <img src={item.image} alt={item.name} />
              </CartItemImage>
              <CartItemInfo>
                <CartItemName>{item.name}</CartItemName>
                <CartItemPrice>
                  ${item.price.toFixed(2)}
                  {item.originalPrice && (
                    <span style={{ textDecoration: 'line-through', marginLeft: '5px', color: '#999' }}>
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </CartItemPrice>
                <CartItemQuantity>Quantity: {item.quantity}</CartItemQuantity>
              </CartItemInfo>
            </CartItem>
          ))}
          
          <OrderTotal>
            <OrderRow>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </OrderRow>
            <OrderRow>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </OrderRow>
            <OrderRow>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </OrderRow>
            <OrderRow className="total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </OrderRow>
          </OrderTotal>
          
          <div style={{ marginTop: '30px' }}>
            <Button text="Place Order" size="large" fullWidth />
          </div>
        </OrderSummary>
      </CheckoutLayout>
    </Container>
  );
};

export default Checkout;
