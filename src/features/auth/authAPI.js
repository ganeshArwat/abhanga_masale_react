// src/features/auth/authAPI.js
import axios from '../../api/axios';

export const signup = async (userData) => {
  const response = await axios.post('/auth/signup', userData);
  return response.data; // { user, token }
};

export const signin = async (credentials) => {
  const response = await axios.post('/auth/signin', credentials);
  return response.data; // { user, token }
};

// Optional: Get current logged-in user
export const getProfile = async () => {
  const response = await axios.get('/auth/profile'); // Protected route
  return response.data;
};
