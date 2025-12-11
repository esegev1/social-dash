// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { initializeInterceptors } from '../api/setupInterceptors'; // 👈 NEW IMPORT

const AuthContext = createContext(null);

// Get API base URL from environment or default to production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.segsy.xyz/';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the context object functions once, so they can be referenced inside the sync interceptor call
  // These are passed to initializeInterceptors for the response interceptor's refresh logic.
  const refreshAccessToken = useCallback(async () => {
    const storedRefreshToken = refreshToken || localStorage.getItem('refreshToken');
    
    if (!storedRefreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}auth/refresh`, {
        refresh_token: storedRefreshToken
      });

      const { access_token } = response.data;
      setAccessToken(access_token);
      return access_token;
      
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      throw error;
    }
  }, [refreshToken]); // NOTE: logout is excluded from dependency to prevent cyclic reference warning

  // Define logout before login/checkSession uses it
  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('refreshToken');
    console.log('User logged out, tokens cleared.');
  }, []); 

  // Function to gather context for interceptor initialization
  const getInterceptorContext = useCallback((access, refresh) => ({
      accessToken: access,
      refreshToken: refresh,
      // Pass the actual functions needed by the response interceptor
      login: (userData, access, refresh) => { /* simplified login logic or full call if necessary */ },
      logout: logout, 
      refreshAccessToken: refreshAccessToken,
  }), [logout, refreshAccessToken]);


  // Login: Store both tokens and user data
  const login = useCallback((userData, access, refresh) => {
    setUser(userData);
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('refreshToken', refresh);
    
    // 👈 1. SYNCHRONOUSLY INITIALIZE INTERCEPTORS ON LOGIN
    initializeInterceptors(getInterceptorContext(access, refresh));
  }, [getInterceptorContext]);


  // Initial app load - check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      let currentAccessToken = null;
      let currentRefreshToken = storedRefreshToken;
      
      if (storedRefreshToken) {
        try {
          // 1. Attempt refresh to get access token
          const refreshResponse = await axios.post(`${API_BASE_URL}auth/refresh`, {
            refresh_token: storedRefreshToken
          });

          currentAccessToken = refreshResponse.data.access_token;
          
          // 2. Verify user data using the newly acquired access token
          const verifyResponse = await axios.get(`${API_BASE_URL}auth/verify`, {
            headers: { Authorization: `Bearer ${currentAccessToken}` }
          });

          const userData = verifyResponse.data.user;
          
          // 3. Update state
          setUser(userData);
          setAccessToken(currentAccessToken);
          setRefreshToken(storedRefreshToken);
          console.log('Session restored from refresh token.');
          
        } catch (error) {
          console.log('No active session or refresh failed:', error.message);
          localStorage.removeItem('refreshToken');
          currentAccessToken = null;
          currentRefreshToken = null;
        }
      }
      
      // 👈 2. SYNCHRONOUSLY INITIALIZE INTERCEPTORS AFTER CHECK
      // This is GUARANTEED to run before child components render.
      initializeInterceptors(getInterceptorContext(currentAccessToken, currentRefreshToken));

      setLoading(false);
    };

    // NOTE: useEffect dependencies (login, logout, refreshAccessToken) are required 
    // when defining them outside of this effect and using them inside. 
    // They are now defined outside and passed via getInterceptorContext.

    checkSession();
    // This effect runs only once on mount.
  }, [getInterceptorContext]); 


  const contextValue = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!user,
    isLoading: loading,
    login,
    logout,
    refreshAccessToken,
  };

  if (loading) {
    return <div>Loading Application...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);