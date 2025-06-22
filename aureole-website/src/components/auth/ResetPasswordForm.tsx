import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginFailure, clearError } from '../../slices/authSlice';
import { resetPassword } from '../../firebase/firebase';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [resetSent, setResetSent] = React.useState(false);
  const { loading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setResetSent(true);
      } else {
        dispatch(loginFailure(result.error || 'Failed to send reset email'));
      }
    } catch (err: any) {
      dispatch(loginFailure(err.message || 'An unexpected error occurred'));
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Reset Password</Title>
      <Description>Enter your email address and we'll send you instructions to reset your password.</Description>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {resetSent ? (
        <SuccessMessage>
          <p>Password reset email sent!</p>
          <p>Please check your inbox for further instructions.</p>
        </SuccessMessage>
      ) : (
        <>
          <InputGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your registered email address"
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </SubmitButton>
        </>
      )}
      
      <BackToLogin>Back to Login</BackToLogin>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #fff0f0;
  color: #e53935;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  background-color: #f0fff0;
  color: #43a047;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #b38a5c;
  }
`;

const SubmitButton = styled.button`
  background-color: #b38a5c;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    background-color: #a07a4c;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.a`
  font-size: 14px;
  color: #b38a5c;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default ResetPasswordForm;
