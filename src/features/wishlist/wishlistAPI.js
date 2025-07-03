// src/features/wishlist/wishlistAPI.js
import axios from "../../api/axios";

export const toggleWishlistAPI = async (productId) => {
  const res = await axios.post("/wishlist", { productId });
  return res.data;
};

export const getWishlistAPI = async () => {
  const res = await axios.get("/wishlist");
  return res.data;
};

export const removeFromWishlist = async (productId) => {
  const res = await axios.delete(`/wishlist/${productId}`);
  return res.data;
};