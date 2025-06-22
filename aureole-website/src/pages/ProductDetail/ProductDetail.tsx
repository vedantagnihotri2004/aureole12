import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../../data/products';
import Button from '../../components/Button';

const Container = styled.div`
  padding: 40px 0;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 60px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ImagesContainer = styled.div`
  flex: 1;
`;

const MainImage = styled.div`
  height: 500px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Thumbnail = styled.div<{ active: boolean }>`
  height: 80px;
  width: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  border: ${props => props.active ? '2px solid #c49a6c' : 'none'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Category = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  font-family: 'Times New Roman', serif;
`;

const Price = styled.div`
  font-size: 24px;
  color: #c49a6c;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-weight: 400;
  font-size: 18px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const Stars = styled.div`
  display: flex;
  color: #f5a623;
`;

const RatingCount = styled.span`
  font-size: 14px;
  color: #666;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #f8f2ea;
  }
`;

const QuantityDisplay = styled.span`
  width: 40px;
  text-align: center;
  font-size: 14px;
`;

const AddToCartButton = styled.div`
  margin-bottom: 30px;
`;

const ProductDetails = styled.div`
  margin-top: 30px;
`;

const DetailsTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  color: ${props => props.active ? '#c49a6c' : '#666'};
  border-bottom: ${props => props.active ? '2px solid #c49a6c' : 'none'};
  
  &:hover {
    color: #c49a6c;
  }
`;

const TabContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Placeholder for additional product images
  const productImages = [
    product?.image,
    product?.image,
    product?.image,
    product?.image
  ];
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const renderStars = (rating: number) => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </>
    );
  };
  
  return (
    <Container>
      <ProductContainer>
        <ImagesContainer>
          <MainImage>
            <img src={productImages[selectedImage]} alt={product.name} />
          </MainImage>
          <ThumbnailsContainer>
            {productImages.map((image, index) => (
              <Thumbnail 
                key={index} 
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} thumbnail ${index+1}`} />
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ImagesContainer>
        
        <ProductInfo>
          <Category>{product.category}</Category>
          <Title>{product.name}</Title>
          
          <Price>
            ${(product.discountPercentage 
              ? product.price - (product.price * product.discountPercentage / 100)
              : product.price).toFixed(2)}
            {product.discountPercentage && (
              <OriginalPrice>${product.price.toFixed(2)}</OriginalPrice>
            )}
          </Price>
          
          <Rating>
            <Stars>{renderStars(product.rating)}</Stars>
            <RatingCount>({product.rating.toFixed(1)})</RatingCount>
          </Rating>
          
          <Description>{product.description}</Description>
          
          <Divider />
          
          <QuantitySelector>
            <QuantityLabel>Quantity:</QuantityLabel>
            <QuantityControls>
              <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
            </QuantityControls>
          </QuantitySelector>
          
          <AddToCartButton>
            <Button text="Add to Cart" size="large" fullWidth />
          </AddToCartButton>
          
          <Divider />
          
          <ProductDetails>
            <DetailsTabs>
              <Tab 
                active={activeTab === 'description'} 
                onClick={() => setActiveTab('description')}
              >
                Description
              </Tab>
              <Tab 
                active={activeTab === 'details'} 
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </Tab>
              <Tab 
                active={activeTab === 'reviews'} 
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </Tab>
            </DetailsTabs>
            
            {activeTab === 'description' && (
              <TabContent>
                <p>{product.description}</p>
                <p>Each Auréole candle is hand-poured using our signature blend of soy and coconut wax, which allows for a cleaner and longer-lasting burn. The fragrances are crafted from natural essential oils and premium perfumes to ensure a consistent and luxurious scent experience.</p>
              </TabContent>
            )}
            
            {activeTab === 'details' && (
              <TabContent>
                <p>
                  <strong>Burn Time:</strong> Approximately 60 hours<br />
                  <strong>Weight:</strong> 8 oz<br />
                  <strong>Dimensions:</strong> 3.5" × 3.5" × 4"<br />
                  <strong>Ingredients:</strong> Soy wax, coconut wax, cotton wick, essential oils<br />
                  <strong>Care:</strong> Trim wick to 1/4" before each use for optimal burning
                </p>
              </TabContent>
            )}
            
            {activeTab === 'reviews' && (
              <TabContent>
                <p>Customer reviews will be displayed here.</p>
              </TabContent>
            )}
          </ProductDetails>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail;
