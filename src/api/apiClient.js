// src/api/apiClient.js

import axios from 'axios';

// Get the base URL from your environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // IMPORTANT: Allows the browser to send the HTTP-Only Refresh Token cookie
  withCredentials: true,
});

export default apiClient;