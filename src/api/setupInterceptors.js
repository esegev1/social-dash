// src/api/setupInterceptors.js
import axiosClient from './axiosClient';

let authContext = null;
let requestInterceptorId = null; // ID to track the current request interceptor
let responseInterceptorId = null; // ID to track the current response interceptor

// Utility function to remove old interceptors (crucial to prevent using stale token closures)
const ejectInterceptors = () => {
    if (requestInterceptorId !== null) {
        axiosClient.interceptors.request.eject(requestInterceptorId);
        requestInterceptorId = null;
    }
    if (responseInterceptorId !== null) {
        axiosClient.interceptors.response.eject(responseInterceptorId);
        responseInterceptorId = null;
    }
};

// This gets called once from App.jsx and on every token change to pass the context
export const initializeInterceptors = (context) => {
  
  // 1. CLEAR ANY EXISTING INTERCEPTORS
  ejectInterceptors(); 
  
  authContext = context;
  
  // 2. SET NEW REQUEST INTERCEPTOR AND STORE ITS ID
  requestInterceptorId = axiosClient.interceptors.request.use(
    (config) => {
      // The logic here is now bound to the fresh 'authContext' variable
      if (authContext?.accessToken) {
        config.headers.Authorization = `Bearer ${authContext.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 3. SET NEW RESPONSE INTERCEPTOR AND STORE ITS ID
  responseInterceptorId = axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Ensure the error response is available before checking status
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log("Access token expired. Attempting refresh...");
          // This calls the refresh function from the latest context
          const newAccessToken = await authContext.refreshAccessToken(); 
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Re-send the original failed request with the new token
          return axiosClient(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed, logging out');
          authContext.logout();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
  
  console.log("Interceptors successfully initialized/re-initialized with new context.");
};