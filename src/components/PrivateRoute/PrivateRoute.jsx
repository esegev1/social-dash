// src/components/PrivateRoute/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

/**
 * A component that protects routes, only allowing authenticated users access.
 * If the user is authenticated, it renders the child route.
 * Otherwise, it redirects them to the login page.
 */
const PrivateRoute = () => {
  // Use the global authentication state
  const { isAuthenticated, isLoading } = useAuth();

  // If the app is still checking the session from local storage/cookie, render a loading state.
  if (isLoading) {
    // You can use a dedicated spinner component here
    return <div>Loading authentication status...</div>; 
  }

  // If authenticated, render the nested route content (Outlet)
  if (isAuthenticated) {
    return <Outlet />;
  } 
  
  // If NOT authenticated, redirect to the login page
  // The 'replace: true' prop prevents the user from hitting the back button to get to the protected page
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
