import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrders } from "./orderAPI"; // ✅ Your API
import { FiShoppingBag } from "react-icons/fi";

const apiUrl = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] pt-[80px] px-4 sm:px-6 py-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#91542b] text-center">
          My Orders
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No orders found.</p>
            <Link to="/" className="text-[#91542b] hover:underline text-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl shadow-sm p-6 bg-[#fdfdfd]"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order ID:{" "}
                      <span className="font-medium">{order.orderId}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed on: {new Date(order.placedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-center bg-white border border-gray-100 rounded-md p-2"
                    >
                      <img
                        crossOrigin="anonymous"
                        src={`${apiUrl}${item.product.image}`}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain rounded-md"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-800 font-medium">
                    Total: ₹{order.totalAmount}
                  </p>
                  <Link
                    to={`/order/${order.orderId}`}
                    className="text-sm text-[#91542b] hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
