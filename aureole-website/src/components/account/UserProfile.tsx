import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { updateUserProfile as updateUserProfileAction } from '../../slices/authSlice';
import { updateUserProfile } from '../../firebase/firebase';
import { showNotification } from '../../slices/uiSlice';

const UserProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('profile');
  
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      const result = await updateUserProfile(user.uid, {
        displayName,
        phoneNumber
      });
      
      if (result.success) {
        dispatch(updateUserProfileAction({ displayName, phoneNumber }));
        dispatch(showNotification({ 
          message: 'Profile updated successfully', 
          type: 'success' 
        }));
      } else {
        dispatch(showNotification({ 
          message: result.error || 'Failed to update profile', 
          type: 'error' 
        }));
      }
    } catch (error: any) {
      dispatch(showNotification({ 
        message: error.message || 'An unexpected error occurred', 
        type: 'error' 
      }));
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return <Container>Please log in to view your profile</Container>;
  }

  return (
    <Container>
      <Title>My Account</Title>
      
      <TabsContainer>
        <Tab
          active={selectedTab === 'profile'}
          onClick={() => setSelectedTab('profile')}
        >
          Profile
        </Tab>
        <Tab
          active={selectedTab === 'orders'}
          onClick={() => setSelectedTab('orders')}
        >
          Orders
        </Tab>
        <Tab
          active={selectedTab === 'addresses'}
          onClick={() => setSelectedTab('addresses')}
        >
          Addresses
        </Tab>
        <Tab
          active={selectedTab === 'wishlist'}
          onClick={() => setSelectedTab('wishlist')}
        >
          Wishlist
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {selectedTab === 'profile' && (
          <Form onSubmit={handleUpdateProfile}>
            <SectionTitle>Personal Information</SectionTitle>
            
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={user.email || ''}
                disabled
              />
              <FieldNote>Email cannot be changed</FieldNote>
            </FormGroup>
            
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </SubmitButton>
          </Form>
        )}
        
        {selectedTab === 'orders' && (
          <div>
            <SectionTitle>Your Orders</SectionTitle>
            <EmptyState>
              <p>You have no orders yet.</p>
              <ShopNowButton to="/products">Shop Now</ShopNowButton>
            </EmptyState>
          </div>
        )}
        
        {selectedTab === 'addresses' && (
          <div>
            <SectionTitle>Saved Addresses</SectionTitle>
            <EmptyState>
              <p>You have no saved addresses.</p>
              <Button>Add New Address</Button>
            </EmptyState>
          </div>
        )}
        
        {selectedTab === 'wishlist' && (
          <div>
            <SectionTitle>Your Wishlist</SectionTitle>
            <EmptyState>
              <p>Your wishlist is empty.</p>
              <ShopNowButton to="/products">Explore Products</ShopNowButton>
            </EmptyState>
          </div>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #333;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: none;
  border: none;
  border-bottom: ${props => props.active ? '2px solid #b38a5c' : '2px solid transparent'};
  color: ${props => props.active ? '#b38a5c' : '#666'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #b38a5c;
  }
  
  @media (max-width: 768px) {
    flex: 1 0 50%;
    text-align: center;
  }
`;

const ContentContainer = styled.div`
  padding: 20px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #333;
`;

const Form = styled.form`
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #b38a5c;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const FieldNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #b38a5c;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #a07a4c;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
  
  p {
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: #b38a5c;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #a07a4c;
  }
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background-color: #b38a5c;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #a07a4c;
  }
`;

export default UserProfile;
