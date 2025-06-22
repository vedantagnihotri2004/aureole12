import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  fullWidth?: boolean;
}

const StyledButton = styled.button<{
  variant: string;
  size: string;
  fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 10px 20px;
          font-size: 13px;
        `;
      case 'large':
        return `
          padding: 16px 36px;
          font-size: 16px;
          letter-spacing: 1.5px;
        `;
      default:
        return `
          padding: 13px 30px;
          font-size: 14px;
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #f8f2ea;
          color: #a07c4a;
          border: none;
          
          &:hover {
            background-color: #f0e8df;
          }
        `;
      case 'outlined':
        return `
          background-color: transparent;
          color: #a07c4a;
          border: 2px solid #a07c4a;
          
          &:hover {
            background-color: #f8f2ea;
          }
        `;
      default:
        return `
          background-color: #b38a5c;
          color: white;
          border: none;
          
          &:hover {
            background-color: #a07c4a;
          }
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  onClick,
  fullWidth = false,
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {text}
    </StyledButton>
  );
};

export default Button;