import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { toggleCart } from '../slices/uiSlice';
import { removeItem, updateQuantity, clearCart, CartItem as CartItemType } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (data: { id: number; quantity: number }) => void;
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuantity({ id: item.id, quantity: parseInt(e.target.value) });
  };

  return (
    <CartItemContainer>
      <ItemImage src={item.image} alt={item.name} />
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
        <QuantityContainer>
          <QuantityLabel>Qty:</QuantityLabel>
          <QuantitySelect value={item.quantity} onChange={handleQuantityChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </QuantitySelect>
          <RemoveButton onClick={() => removeItem(item.id)}>Remove</RemoveButton>
        </QuantityContainer>
      </ItemDetails>
    </CartItemContainer>
  );
};

const ShoppingCart: React.FC = () => {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { isCartOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const closeCart = () => {
    dispatch(toggleCart());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = ({ id, quantity }: { id: number; quantity: number }) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isCartOpen) return null;

  return (
    <CartOverlay>
      <CartContainer>
        <CartHeader>
          <CartTitle>Your Cart ({items.length})</CartTitle>
          <CloseButton onClick={closeCart}>&times;</CloseButton>
        </CartHeader>

        <CartContent>
          {items.length > 0 ? (
            <>
              <ItemsList>
                {items.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={handleUpdateQuantity}
                    removeItem={handleRemoveItem}
                  />
                ))}
              </ItemsList>

              <CartFooter>
                <ClearButton onClick={handleClearCart}>Clear Cart</ClearButton>

                <TotalSection>
                  <TotalLabel>Subtotal</TotalLabel>
                  <TotalAmount>${totalAmount.toFixed(2)}</TotalAmount>
                </TotalSection>

                <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
                <ContinueButton onClick={closeCart}>Continue Shopping</ContinueButton>
              </CartFooter>
            </>
          ) : (
            <EmptyCart>
              <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
              <ShopNowButton onClick={closeCart} to="/products">
                Shop Now
              </ShopNowButton>
            </EmptyCart>
          )}
        </CartContent>
      </CartContainer>
    </CartOverlay>
  );
};

// Styled Components
const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const CartHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ItemsList = styled.div`
  flex: 1;
  padding: 20px;
`;

const CartItemContainer = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 5px 0;
  color: #333;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #b38a5c;
  margin-bottom: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 8px;
`;

const QuantitySelect = styled.select`
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  margin-left: 15px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #d32f2f;
  }
`;

const CartFooter = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  margin-bottom: 15px;
  transition: color 0.2s;

  &:hover {
    color: #d32f2f;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const TotalAmount = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #b38a5c;
`;

const CheckoutButton = styled(Link)`
  display: block;
  background-color: #b38a5c;
  color: white;
  text-align: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #a07a4c;
  }
`;

const ContinueButton = styled.button`
  display: block;
  width: 100%;
  background-color: white;
  color: #b38a5c;
  text-align: center;
  padding: 15px;
  border: 1px solid #b38a5c;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: #f9f3eb;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  text-align: center;
  flex: 1;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background-color: #b38a5c;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #a07a4c;
  }
`;

export default ShoppingCart;
