// src/features/category/categoryAPI.js
import axios from "../../api/axios";

export const fetchCategories = async () => {
  const res = await axios.get("/category");
  return res.data.data.data;
};

export const createCategory = async (data) => {
  const res = await axios.post("/category", data);
  return res.data.data.data;
};

export const updateCategory = async (id, data) => {
  const res = await axios.patch(`/category/${id}`, data);
  return res.data.data.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`/category/${id}`);
};
