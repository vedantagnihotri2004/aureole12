import React from 'react';
import styled from 'styled-components';

interface TestimonialProps {
  quote: string;
  author: string;
  position?: string;
}

const TestimonialSection = styled.section`
  padding: 80px 0;
  background: #f8f2ea;
  text-align: center;
  margin-top: 60px;
`;

const TestimonialTitle = styled.h2`
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

const TestimonialList = styled.div`
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
`;

const TestimonialCard = styled.div`
  flex: 1;
  background: white;
  padding: 36px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(200, 180, 140, 0.12);
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 30px;
    font-size: 120px;
    color: #f0e8df;
    font-family: 'Times New Roman', serif;
    line-height: 1;
    z-index: 0;
  }
`;

const Quote = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const Author = styled.p`
  font-size: 16px;
  color: #222;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Position = styled.p`
  font-size: 14px;
  color: #888;
`;

const Testimonials: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote: "The fragrances from Auréole transform my living space into a sanctuary. Every candle is a masterpiece of scent that brings me joy and relaxation.",
      author: "Emily Johnson",
      position: "Interior Designer"
    },
    {
      quote: "I've tried many luxury candle brands, but Auréole stands out for their exceptional quality and attention to detail. The scents are unlike anything else.",
      author: "Michael Chen",
      position: "Hotel Concierge"
    },
    {
      quote: "The Vanilla & Cedar candle has become my signature home scent. I receive so many compliments from guests about how inviting my home feels.",
      author: "Sophia Rodriguez",
      position: "Lifestyle Blogger"
    }
  ];

  return (
    <TestimonialSection>
      <TestimonialTitle>What Our Customers Say</TestimonialTitle>
      <TestimonialList>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <Quote>{testimonial.quote}</Quote>
            <Author>{testimonial.author}</Author>
            {testimonial.position && <Position>{testimonial.position}</Position>}
          </TestimonialCard>
        ))}
      </TestimonialList>
    </TestimonialSection>
  );
};

export default Testimonials;
