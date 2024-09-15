import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Check for token expiration
  const currentTime = new Date().getTime();
  if (userInfo && currentTime > userInfo.expirationTime) {
    localStorage.removeItem('userInfo');  // Remove expired token
    alert('Session expired. Please log in again.');
    return <Navigate to="/login" />;
  }

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
