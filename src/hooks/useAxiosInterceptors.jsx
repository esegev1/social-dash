// src/hooks/useAxiosInterceptors.jsx

import { useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.segsy.xyz/';

const useAxiosInterceptors = () => {
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const apiClient = useMemo(() => {
    // Create a new axios instance
    const client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // REQUEST INTERCEPTOR: Add access token to every request
    client.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR: Handle 401 errors and refresh token
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("Access token expired. Attempting refresh...");
            
            // Attempt to refresh the access token
            const newAccessToken = await refreshAccessToken();

            // Update the failed request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the original request
            return client(originalRequest);
            
          } catch (refreshError) {
            console.error('Token refresh failed, logging out');
            logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        // For all other errors, just reject
        return Promise.reject(error);
      }
    );

    return client;
  }, [accessToken, refreshAccessToken, logout]);

  return apiClient;
};

export default useAxiosInterceptors;