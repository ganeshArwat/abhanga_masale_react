import axios from "../../../api/axios";

// Create a new product
export const createProduct = async (formData) => {
  const response = await axios.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.data;
};

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get("/product");
  return response.data.data.data;
};

// Get a single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`/product/${id}`);
  return response.data.data.data;
};

// Update a product
export const updateProduct = async (id, formData) => {
  const response = await axios.patch(`/product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`/product/${id}`);
  return response.data;
};
