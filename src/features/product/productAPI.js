import axios from "../../api/axios";

// 🟢 Fetch all products
export const fetchProducts = async () => {
  const res = await axios.get("/product");
  return res.data.data.data; // adjust this based on your real response shape
};

// 🔵 Fetch single product by ID (for product detail page)
export const fetchProductById = async (id) => {
  const res = await axios.get(`/product/${id}`);
  return res.data.data.product; // adjust key if needed
};
