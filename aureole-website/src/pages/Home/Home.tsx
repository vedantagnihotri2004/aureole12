import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchProducts } from '../../slices/productSlice';
import FeaturedSection from '../../components/FeaturedSection';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import Testimonials from '../../components/Testimonials';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  min-height: 520px;
  background: linear-gradient(90deg, #fff 60%, #f8f2ea 100%);
  border-radius: 0 0 32px 32px;
  box-shadow: 0 8px 32px rgba(200, 180, 140, 0.08);
  margin-bottom: 60px;
  padding: 40px 0 40px 0;
`;

const HeroContent = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 60px;
`;

const HeroTitle = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: #b38a5c;
  margin-bottom: 24px;
  font-family: 'Playfair Display', 'Times New Roman', serif;
  letter-spacing: 2px;
  line-height: 1.1;
`;

const HeroSubtitle = styled.p`
  font-size: 22px;
  color: #444;
  margin-bottom: 36px;
  line-height: 1.6;
  max-width: 520px;
`;

const HeroButton = styled.a`
  display: inline-block;
  background: #b38a5c;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 16px 40px;
  border-radius: 32px;
  text-decoration: none;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 16px rgba(200, 180, 140, 0.12);
  transition: background 0.2s;
  &:hover {
    background: #a07c4a;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 420px;
    height: 420px;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(200, 180, 140, 0.12);
    background: #fff;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #222;
  margin-bottom: 48px;
  text-align: center;
  font-family: 'Playfair Display', 'Times New Roman', serif;
  position: relative;
  padding-bottom: 16px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 60px;
    background-color: #b38a5c;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
  margin-top: 40px;
  padding: 0 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 40px;
  padding: 0 30px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  &:hover img {
    transform: scale(1.08);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    pointer-events: none;
  }
`;

const CategoryName = styled.h3`
  position: absolute;
  bottom: 24px;
  left: 24px;
  color: white;
  font-size: 26px;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Playfair Display', serif;
  font-weight: 600;
`;

const SpecialOffer = styled.div`
  display: flex;
  background: linear-gradient(to right, #f8f2ea, #ffffff);
  border-radius: 16px;
  overflow: hidden;
  margin: 40px 30px 0 30px;
  box-shadow: 0 8px 32px rgba(200, 180, 140, 0.12);
  
  > div {
    flex: 1;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  img {
    flex: 1;
    object-fit: cover;
    min-height: 400px;
  }
`;

const OfferTitle = styled.h3`
  font-size: 42px;
  margin-bottom: 24px;
  color: #b38a5c;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
`;

const OfferDescription = styled.p`
  font-size: 18px;
  margin-bottom: 36px;
  color: #555;
  line-height: 1.6;
  max-width: 480px;
`;

// Temporary image placeholders
const placeholderImage = "https://placehold.co/600x400/e9d9c8/333333?text=Auréole+Candle";

const Home: React.FC = () => {
  // Temporary product data
  const featuredProducts = [
    { id: 1, name: "Vanilla & Cedar", price: 35, image: placeholderImage, discountPercentage: 0 },
    { id: 2, name: "Amber & Moss", price: 42, image: placeholderImage, discountPercentage: 15 },
    { id: 3, name: "Sandalwood & Lavender", price: 38, image: placeholderImage, discountPercentage: 0 },
    { id: 4, name: "Bergamot & Jasmine", price: 40, image: placeholderImage, discountPercentage: 10 },
  ];
  
  const categories = [
    { id: 1, name: "Classic Collection", image: placeholderImage },
    { id: 2, name: "Seasonal", image: placeholderImage },
    { id: 3, name: "Gift Sets", image: placeholderImage },
  ];
  
  const collections = [
    { id: 1, name: "Signature Collection", description: "Our timeless classics, meticulously crafted for enduring luxury.", image: placeholderImage },
    { id: 2, name: "Limited Edition", description: "Exclusive fragrances created for special moments and celebrations.", image: placeholderImage }
  ];
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Illuminate Your Space<br />with Luxury Scents</HeroTitle>
          <HeroSubtitle>
            Hand-poured premium candles crafted with natural ingredients to transform your home into a sanctuary of calm and beauty.
          </HeroSubtitle>
          <HeroButton href="/products">Shop Now</HeroButton>
        </HeroContent>
        <HeroImageContainer>
          <img src={placeholderImage} alt="Auréole luxury candle" />
        </HeroImageContainer>
      </HeroSection>
      
      <section>
        <SectionTitle>Our Collections</SectionTitle>
        <div style={{ display: 'flex', gap: '40px', padding: '0 30px', marginBottom: '60px' }}>
          {collections.map((collection, index) => (
            <div key={collection.id} style={{ 
              flex: 1,
              display: 'flex',
              gap: '30px',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
            }}>
              <div style={{ flex: 1 }}>
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                  }}
                />
              </div>
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '30px'
              }}>
                <h3 style={{ 
                  fontSize: '28px', 
                  marginBottom: '16px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600
                }}>{collection.name}</h3>
                <p style={{ 
                  fontSize: '16px',
                  marginBottom: '24px',
                  color: '#555',
                  lineHeight: 1.6
                }}>{collection.description}</p>
                <div>
                  <Button text="Explore Collection" variant="outlined" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <SectionTitle>Best Sellers</SectionTitle>
        <ProductGrid>
          {featuredProducts.map(product => (
            <div key={product.id}>
              <ProductCard 
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                discountPercentage={product.discountPercentage}
              />
            </div>
          ))}
        </ProductGrid>
      </section>

      <section>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.id}>
              <img src={category.image} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </section>
      
      <section>
        <SectionTitle>Special Offer</SectionTitle>
        <SpecialOffer>
          <div>
            <OfferTitle>45% Off Summer Collection</OfferTitle>
            <OfferDescription>
              Experience our limited edition summer scents, perfect for creating a refreshing atmosphere during warm days.
            </OfferDescription>
            <FeaturedSection showButton={true} buttonText="Shop Now" />
          </div>
          <img src={placeholderImage} alt="Summer Collection" />
        </SpecialOffer>
      </section>
      
      <Testimonials />
    </HomeContainer>
  );
};

export default Home;