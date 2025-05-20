import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access');
  
  if (!accessToken) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in, render the child component
  return children;
};

export default ProtectedRoute;
