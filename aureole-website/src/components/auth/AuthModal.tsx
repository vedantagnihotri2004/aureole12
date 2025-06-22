import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setAuthModalOpen, setAuthModalType } from '../../slices/uiSlice';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalType } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  
  const handleClose = () => {
    dispatch(setAuthModalOpen(false));
  };
  
  const switchToLogin = () => {
    dispatch(setAuthModalType('login'));
  };
  
  const switchToRegister = () => {
    dispatch(setAuthModalType('register'));
  };
  
  const switchToReset = () => {
    dispatch(setAuthModalType('reset'));
  };
  
  if (!isAuthModalOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        
        <ModalBody>
          <FormContainer>
            {authModalType === 'login' && (
              <>
                <LoginForm />
                <SwitchText>
                  Don't have an account?{' '}
                  <SwitchLink onClick={switchToRegister}>Create one</SwitchLink>
                </SwitchText>
                <SwitchLink onClick={switchToReset} style={{ fontSize: '14px', marginTop: '8px' }}>
                  Forgot your password?
                </SwitchLink>
              </>
            )}
            
            {authModalType === 'register' && (
              <>
                <RegisterForm />
                <SwitchText>
                  Already have an account?{' '}
                  <SwitchLink onClick={switchToLogin}>Sign in</SwitchLink>
                </SwitchText>
              </>
            )}
            
            {authModalType === 'reset' && <ResetPasswordForm />}
          </FormContainer>
          
          <ImageContainer>
            <AuthImage src="/logo512.png" alt="Auréole Beauty" />
            <ImageText>
              <ImageHeading>Experience Luxury</ImageHeading>
              <ImageDescription>Join the world of Auréole beauty and unlock exclusive benefits.</ImageDescription>
            </ImageText>
          </ImageContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  max-height: 90vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  z-index: 10;
  
  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  display: flex;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const AuthImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ImageHeading = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ImageDescription = styled.p`
  font-size: 16px;
`;

const SwitchText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  text-align: center;
  color: #555;
`;

const SwitchLink = styled.span`
  color: #b38a5c;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default AuthModal;
