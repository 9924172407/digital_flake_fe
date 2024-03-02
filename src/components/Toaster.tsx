import React from 'react';
import { ToastContainer, toast, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  messageType?: 'success' | 'error' | 'warning' | 'info';
}

const CommonToast: React.FC<ToastProps & ToastContainerProps> = ({ messageType, ...toastContainerProps }) => (
  <ToastContainer
    autoClose={2000} 
    pauseOnHover={false}
    {...toastContainerProps}
  />
);

export const showToast = (message: string, messageType: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  toast[messageType](message, {
    autoClose: 2000,
    pauseOnHover: false,
  });
};

export default CommonToast;
