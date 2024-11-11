import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute Component to check for authentication
const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for authentication token

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element; // Render the element (protected component) if authenticated
};

export default ProtectedRoute;
