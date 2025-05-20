import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access');

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
