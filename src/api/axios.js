// src/api/axios.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${apiUrl}api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Automatically add token from localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
