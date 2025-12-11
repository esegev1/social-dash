// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Get API base URL from environment or default to production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.segsy.xyz/';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login: Store both tokens and user data
  const login = useCallback((userData, access, refresh) => {
    setUser(userData);
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('refreshToken', refresh);
  }, []);

  // Logout: Clear all tokens and user data
  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('refreshToken');
    console.log('User logged out, tokens cleared.');
  }, []);

  // Refresh access token using the refresh token
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
  }, [refreshToken, logout]);

  // Initial app load - check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (storedRefreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}auth/refresh`, {
            refresh_token: storedRefreshToken
          });

          const { access_token } = response.data;
          
          const verifyResponse = await axios.get(`${API_BASE_URL}auth/verify`, {
            headers: { Authorization: `Bearer ${access_token}` }
          });

          const userData = verifyResponse.data.user;
          
          setUser(userData);
          setAccessToken(access_token);
          setRefreshToken(storedRefreshToken);
          console.log('Session restored from refresh token.');
          
        } catch (error) {
          console.log('No active session or refresh failed:', error.message);
          localStorage.removeItem('refreshToken');
        }
      }
      
      setLoading(false);
    };

    checkSession();
  }, []);

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