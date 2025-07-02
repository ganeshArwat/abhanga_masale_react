import axios from "../../api/axios";

// 🟢 Fetch all products
export const fetchProducts = async () => {
  const res = await axios.get("/product");
  return res.data.data.data; // adjust this based on your real response shape
};

// 🔹 Fetch product detail by Slug
export const fetchProductBySlug = async (productSlug) => {
  const res = await axios.get(`/product/getProductBySlug/${productSlug}`);
  console.log(res.data);
  return res.data.data.product; // Adjust if response format differs
};

// 🔸 Fetch similar/random products
export const fetchSimilarProducts = async (productSlug) => {
  const res = await axios.get(`/product/random_products/${productSlug}`);
  return res.data.data; // Again, adjust based on actual API shape
};

