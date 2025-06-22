import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { registerUser } from '../../slices/authSlice';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const { loading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Using our Redux thunk which handles API integration
    dispatch(registerUser({ 
      name: displayName, 
      email, 
      password 
    }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Create Account</Title>
      <Description>Join Auréole to explore luxury beauty products and receive exclusive offers.</Description>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <InputGroup>
        <Label htmlFor="displayName">Full Name</Label>
        <Input 
          id="displayName"
          type="text" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
          placeholder="Your full name"
          required
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Your email address"
          required
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Create a password"
          required
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword"
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm your password"
          required
        />
        {passwordError && <FieldError>{passwordError}</FieldError>}
      </InputGroup>
      
      <PolicyText>
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </PolicyText>
      
      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </SubmitButton>
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

const InputGroup = styled.div`
  margin-bottom: 16px;
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

const FieldError = styled.p`
  color: #e53935;
  font-size: 12px;
  margin-top: 5px;
`;

const PolicyText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
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
  
  &:hover {
    background-color: #a07a4c;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default RegisterForm;
