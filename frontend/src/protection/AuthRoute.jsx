import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access');

  if (accessToken) {
    // User is logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in, allow access
  return children;
};

export default AuthRoute;
