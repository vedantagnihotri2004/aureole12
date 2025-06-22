import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface FeaturedSectionProps {
  showButton?: boolean;
  buttonText?: string;
}

const Container = styled.div`
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  margin-top: 28px;
  display: flex;
`;

const FeatureList = styled.div`
  display: flex;
  gap: 36px;
  margin-top: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
    height: 18px;
    width: 1px;
    background-color: #e0d5c8;
  }
`;

const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  background-color: #b38a5c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(200, 180, 140, 0.15);
`;

const FeatureText = styled.span`
  font-size: 15px;
  color: #555;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  showButton = false,
  buttonText = "Shop Now"
}) => {
  // Icons for features
  const featureIcons = ["♦", "★", "✓"];
  
  const features = [
    "Natural Ingredients",
    "Hand-Poured",
    "Long Lasting"
  ];

  return (
    <Container>
      <FeatureList>
        {features.map((feature, index) => (
          <FeatureItem key={index}>
            <IconPlaceholder>{featureIcons[index]}</IconPlaceholder>
            <FeatureText>{feature}</FeatureText>
          </FeatureItem>
        ))}
      </FeatureList>
      
      {showButton && (
        <ButtonWrapper>
          <Button text={buttonText} />
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default FeaturedSection;