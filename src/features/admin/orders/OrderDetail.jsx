import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const mockOrder = {
  id: "ORD001",
  customer: {
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "+91-9876543210",
    address: "123, Pune, Maharashtra, India",
  },
  items: [
    { id: 1, name: "Red Chilli Powder", qty: 2, price: 120 },
    { id: 2, name: "Turmeric Powder", qty: 1, price: 90 },
  ],
  total: 330,
  status: "Pending",
  date: "2025-07-01",
};

function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-300";
    case "Delivered":
      return "bg-green-50 text-green-700 border-green-300";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockOrder;

  return (
    <div className="bg-white shadow-md rounded-xl px-6 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-[#91542b] mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" /> Back to Orders
      </button>

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[#91542b]">
            Order <span className="text-gray-700">#{order.id}</span>
          </h2>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-wide border ${getStatusBadge(
              order.status
            )}`}
          >
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#b88c2c] mb-2">Customer Information</h3>
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {order.customer.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {order.customer.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Phone:</span>{" "}
            {order.customer.phone}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Address:</span>{" "}
            {order.customer.address}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#b88c2c] mb-2">Order Information</h3>
          <p>
            <span className="font-semibold text-gray-700">Date:</span> {order.date}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Total Amount:</span> ₹
            {order.total}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-[#b88c2c] mb-3">Product Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-[#f6f1e7]">
              <tr>
                <th className="px-4 py-3 text-left text-[#91542b] font-medium">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-[#91542b] font-medium">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-[#91542b] font-medium">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-[#91542b] font-medium">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t hover:bg-[#fdf9f3]">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.qty}</td>
                  <td className="px-4 py-3">₹{item.price}</td>
                  <td className="px-4 py-3">₹{item.qty * item.price}</td>
                </tr>
              ))}
              <tr className="border-t font-semibold">
                <td className="px-4 py-3 text-right" colSpan={3}>
                  Total
                </td>
                <td className="px-4 py-3">₹{order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
