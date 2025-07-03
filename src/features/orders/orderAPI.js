import axios from "../../api/axios";

// 📦 Fetch all orders for the logged-in user
export const fetchOrders = async () => {
  const res = await axios.get("/orders");
  return res.data.orders;
};

// 📄 Fetch a single order by orderId
export const fetchOrderById = async (orderId) => {
  const res = await axios.get(`/orders/${orderId}`);
  return res.data.order;
};

// 🛒 Place a new order
export const createOrder = async (data) => {
  const res = await axios.post("/orders", data);
  return res.data.order;
};

export const fetchOrderByOrderId = async (orderId) => {
  const res = await axios.get(`/orders/${orderId}`);
  return res.data.order;
};
