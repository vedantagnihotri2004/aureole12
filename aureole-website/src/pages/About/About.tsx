import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Times New Roman', serif;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Times New Roman', serif;
  text-align: center;
`;

const StorySection = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const StoryContent = styled.div`
  flex: 1;
`;

const StoryImage = styled.div`
  flex: 1;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoryText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background-color: #f8f2ea;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #c49a6c;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const ValueTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  font-family: 'Times New Roman', serif;
`;

const ValueDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const ProcessSteps = styled.div`
  margin: 40px auto;
  max-width: 800px;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 30px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:not(:last-child):before {
    content: '';
    position: absolute;
    left: 25px;
    top: 60px;
    bottom: -30px;
    width: 2px;
    background-color: #c49a6c;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background-color: #c49a6c;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  font-family: 'Times New Roman', serif;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const Team = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
`;

const TeamMember = styled.div`
  width: calc(25% - 30px);
  text-align: center;
  
  @media (max-width: 900px) {
    width: calc(33.333% - 30px);
  }
  
  @media (max-width: 600px) {
    width: calc(50% - 20px);
  }
`;

const MemberImage = styled.div`
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MemberName = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  font-family: 'Times New Roman', serif;
`;

const MemberPosition = styled.p`
  font-size: 14px;
  color: #666;
`;

const About: React.FC = () => {
  const placeholderImage = "https://placehold.co/600x400/e9d9c8/333333?text=Auréole";
  
  const teamMembers = [
    { name: "Sajal Gangwar", position: "Head", image: placeholderImage },
    { name: "Swayam Sharma", position: "Head", image: placeholderImage },
    { name: "Saurabh Arya", position: "Head", image: placeholderImage },
    { name: "Vedant Agnihotri", position: "head", image: placeholderImage }
  ];
  
  return (
    <Container>
      <Header>
        <Title>Our Story</Title>
        <Subtitle>
          At Auréole, we believe that a well-crafted candle can transform a space and elevate everyday moments into luxurious experiences.
        </Subtitle>
      </Header>
      
      <Section>
        <StorySection>
          <StoryContent>
            <StoryText>
              Auréole was founded in 2018 by Emma Clarke, a former interior designer with a passion for creating beautiful living spaces. After years of searching for candles that combined exceptional fragrances, clean-burning ingredients, and elegant design, Emma decided to create her own.
            </StoryText>
            <StoryText>
              What began as a small operation in her Brooklyn apartment has grown into a thriving business dedicated to handcrafting premium candles using only the finest natural ingredients. Each Auréole candle is meticulously designed to enhance your home's ambiance while providing a moment of tranquility in your day.
            </StoryText>
            <StoryText>
              Our name "Auréole" comes from the French word for a halo of light—reflecting our mission to bring warmth, illumination, and beauty into everyday life through our thoughtfully crafted products.
            </StoryText>
          </StoryContent>
          
          <StoryImage>
            <img src={placeholderImage} alt="Auréole workshop" />
          </StoryImage>
        </StorySection>
      </Section>
      
      <Section>
        <SectionTitle>Our Values</SectionTitle>
        
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>♺</ValueIcon>
            <ValueTitle>Sustainability</ValueTitle>
            <ValueDescription>
              We are committed to environmentally conscious practices, from our renewable soy and coconut wax blend to our recyclable packaging and carbon-neutral shipping.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>🌱</ValueIcon>
            <ValueTitle>Natural Ingredients</ValueTitle>
            <ValueDescription>
              We use only natural, non-toxic ingredients in our candles—no parabens, phthalates, or synthetic fragrances that can compromise air quality or health.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>🤝</ValueIcon>
            <ValueTitle>Community</ValueTitle>
            <ValueDescription>
              We partner with local artisans and give back to our community through donations and sustainability initiatives that support environmental conservation.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>✨</ValueIcon>
            <ValueTitle>Craftsmanship</ValueTitle>
            <ValueDescription>
              Every candle is hand-poured in small batches by our skilled team, ensuring meticulous attention to detail and consistent quality in each product.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>🎨</ValueIcon>
            <ValueTitle>Thoughtful Design</ValueTitle>
            <ValueDescription>
              We believe in the power of beautiful objects to enhance everyday life, creating vessels that complement your home long after the candle is gone.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>⭐</ValueIcon>
            <ValueTitle>Excellence</ValueTitle>
            <ValueDescription>
              We never compromise on quality, from ingredient sourcing to customer service, striving to exceed expectations in every aspect of our business.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </Section>
      
      <Section>
        <SectionTitle>Our Process</SectionTitle>
        
        <ProcessSteps>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Ingredient Selection</StepTitle>
              <StepDescription>
                We source the finest natural ingredients from trusted suppliers committed to sustainable and ethical practices. Our wax blend is made from renewable resources, and our fragrances use premium essential oils and perfumes free from harmful chemicals.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Fragrance Development</StepTitle>
              <StepDescription>
                Our scent library is carefully developed through extensive testing and refinement. Each fragrance is designed to create a specific ambiance, from calming and restorative to energizing and uplifting.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Hand-Pouring</StepTitle>
              <StepDescription>
                Every Auréole candle is hand-poured in small batches at our Brooklyn studio. This artisanal approach allows us to maintain meticulous quality control throughout the production process.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Curing & Quality Control</StepTitle>
              <StepDescription>
                After pouring, each candle must cure for at least 48 hours to allow the fragrance to properly bind with the wax. Every candle undergoes rigorous quality testing before being packaged and shipped to your home.
              </StepDescription>
            </StepContent>
          </Step>
        </ProcessSteps>
      </Section>
      
      <Section>
        <SectionTitle>Meet Our Team</SectionTitle>
        
        <Team>
          {teamMembers.map((member, index) => (
            <TeamMember key={index}>
              <MemberImage>
                <img src={member.image} alt={member.name} />
              </MemberImage>
              <MemberName>{member.name}</MemberName>
              <MemberPosition>{member.position}</MemberPosition>
            </TeamMember>
          ))}
        </Team>
      </Section>
    </Container>
  );
};

export default About;
