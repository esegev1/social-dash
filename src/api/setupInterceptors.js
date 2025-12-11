// src/api/setupInterceptors.js
import axiosClient from './axiosClient';

let authContext = null;

// This gets called once from App.jsx to pass the auth context
export const initializeInterceptors = (context) => {
  authContext = context;

  // REQUEST INTERCEPTOR
  axiosClient.interceptors.request.use(
    (config) => {
      if (authContext?.accessToken) {
        config.headers.Authorization = `Bearer ${authContext.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE INTERCEPTOR
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log("Access token expired. Attempting refresh...");
          const newAccessToken = await authContext.refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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
};