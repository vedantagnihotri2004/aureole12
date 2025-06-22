import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addItem } from '../slices/cartSlice';
import { showNotification } from '../slices/uiSlice';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  discountPercentage?: number;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  margin: 10px 0;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(200, 180, 140, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 320px;
  overflow: hidden;
  background: #f8f8f8;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.08);
  }
`;

const QuickView = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18px;
  background-color: rgba(255, 255, 255, 0.95);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  
  ${Card}:hover & {
    transform: translateY(0);
  }
`;

const DiscountBadge = styled.div<{ discountPercentage: number }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #b38a5c;
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 600;
  display: ${props => props.discountPercentage ? 'block' : 'none'};
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
`;

const Name = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  color: #222;
  font-weight: 600;
  font-family: 'Playfair Display', 'Times New Roman', serif;
  letter-spacing: 0.5px;
`;

const Price = styled.div`
  font-size: 18px;
  color: #b38a5c;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.5px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-weight: 400;
  font-size: 16px;
`;

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  discountPercentage
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const discountedPrice = discountPercentage 
    ? price - (price * discountPercentage / 100)
    : price;
  
  const handleViewProduct = () => {
    navigate(`/product/${id}`);
  };
  
  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      price: discountedPrice,
      originalPrice: discountPercentage ? price : undefined,
      quantity: 1,
      image,
      discountPercentage
    }));
    
    dispatch(showNotification({
      message: `${name} added to your cart`,
      type: 'success',
      duration: 3000
    }));
  };
  
  return (
    <Card>
      <ImageContainer>
        <img src={image} alt={name} />
        <DiscountBadge discountPercentage={discountPercentage || 0}>
          {discountPercentage}% OFF
        </DiscountBadge>
        <QuickView>
          <QuickActions>
            <Button text="View Product" variant="outlined" onClick={handleViewProduct} fullWidth />
            <Button text="Add to Cart" variant="primary" onClick={handleAddToCart} fullWidth />
          </QuickActions>
        </QuickView>
      </ImageContainer>
      <Content>
        <Name>{name}</Name>
        <Price>
          ${discountedPrice.toFixed(2)}
          {discountPercentage && <OriginalPrice>${price.toFixed(2)}</OriginalPrice>}
        </Price>
      </Content>
    </Card>
  );
};

export default ProductCard;