import { FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: "ORD001",
    customer: "Amit Sharma",
    date: "2025-07-01",
    total: 320,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Priya Verma",
    date: "2025-07-01",
    total: 590,
    status: "Delivered",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function OrderList() {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#91542b] mb-6">Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-[#f6f1e7] text-left">
            <tr>
              <th className="px-6 py-3 text-[#91542b]">Order ID</th>
              <th className="px-6 py-3 text-[#91542b]">Customer</th>
              <th className="px-6 py-3 text-[#91542b]">Date</th>
              <th className="px-6 py-3 text-[#91542b]">Total</th>
              <th className="px-6 py-3 text-[#91542b]">Status</th>
              <th className="px-6 py-3 text-[#91542b] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#fdf9f3] border-b last:border-none"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">₹{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                        <Link to={`/admin/orders/${order.id}`} title="View Details" className="text-blue-600 hover:text-blue-800">
                            <FiEye />
                        </Link>

                        <button
                            title="Cancel Order"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleCancel(order.id)} // optional
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
