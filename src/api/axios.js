// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // You can set full backend URL if needed like: 'http://localhost:5000/api'
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
