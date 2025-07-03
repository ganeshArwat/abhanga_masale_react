// src/features/cart/cartAPI.js
import axios from "../../api/axios";

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post("cart", {
    productId,
    quantity,
  });
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get("cart");
  return response.data;
};

export const updateCartQuantity = async (productId, quantity) => { 
  const response = await axios.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axios.delete(`cart/${productId}`);
  return response.data;
};