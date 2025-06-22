import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { hideNotification } from '../slices/uiSlice';

const NotificationSystem: React.FC = () => {
  const { notification } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notification.show) {
      // Note: We're now handling the auto-hide in the uiSlice reducer
      // This useEffect is kept as a fallback to ensure notifications don't stay forever
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification.show, dispatch]);

  if (!notification.show) return null;

  return (
    <NotificationContainer type={notification.type}>
      <NotificationMessage>{notification.message}</NotificationMessage>
      <CloseButton onClick={() => dispatch(hideNotification())}>&times;</CloseButton>
    </NotificationContainer>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface NotificationProps {
  type: 'success' | 'error' | 'info';
}

const getBackgroundColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'info':
    default:
      return '#2196f3';
  }
};

const NotificationContainer = styled.div<NotificationProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  background-color: ${props => getBackgroundColor(props.type)};
  color: white;
  padding: 16px 20px;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1100;
`;

const NotificationMessage = styled.div`
  flex: 1;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  line-height: 1;
`;

export default NotificationSystem;
