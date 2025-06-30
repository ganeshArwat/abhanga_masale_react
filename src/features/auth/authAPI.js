// src/features/auth/authAPI.js
import axios from '../../api/axios';

export const signup = async (userData) => {
  const response = await axios.post('/auth/signup', userData);
  return response.data; // { user, token }
};

export const signin = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data; // { user, token }
};

export const forgotPassword = async (email) => {
  const response = await axios.post("/auth/forgotPassword", { email });
  return response.data; // e.g., { message: "Reset link sent" }
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await axios.patch(`/auth/resetPassword/${token}`, {
    password: newPassword,
  });
  return response.data; // e.g., { message: "Password reset successful" }
};

// Optional: Get current logged-in user
export const getProfile = async () => {
  const response = await axios.get('/users/me'); // Protected route
  return response.data.data.data;
};
