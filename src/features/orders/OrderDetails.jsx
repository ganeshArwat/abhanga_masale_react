import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrderByOrderId } from "./orderAPI";

const apiUrl = import.meta.env.VITE_API_URL;

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const data = await fetchOrderByOrderId(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);
      }
    };

    getOrder();
  }, [orderId]);

  if (!order) {
    return <p className="pt-[100px] text-center">Loading order...</p>;
  }

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-[calc(100vh-80px)] pt-[80px] px-4 sm:px-6 py-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#91542b] text-center">
          Order Details
        </h1>

        <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-[#fdfdfd] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <p className="text-sm text-gray-600">
                Order ID: <span className="font-medium">{order.id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Information</h2>
            <p className="text-sm text-gray-700">Name: {order.shipping.fullName}</p>
            <p className="text-sm text-gray-700">Phone: {order.shipping.phone}</p>
            <p className="text-sm text-gray-700">Email: {order.shipping.email}</p>
            <p className="text-sm text-gray-700">Address: {order.shipping.address}</p>
          </div>

          {/* Items */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Items</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    crossOrigin="anonymous"
                    src={`${apiUrl}${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-contain border rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-gray-800 font-semibold text-base border-t pt-4">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <Link
            to="/orders"
            className="text-sm text-[#91542b] hover:underline inline-block mt-2"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
