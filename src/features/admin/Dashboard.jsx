import StatCard from "./components/StatCard";
import {
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiTag,
} from "react-icons/fi";

function Dashboard() {
  // Mock data
  const stats = [
    { title: "Total Orders", value: 152, icon: <FiShoppingBag />, color: "#b88c2c" },
    { title: "Products", value: 87, icon: <FiBox />, color: "#91542b" },
    { title: "Categories", value: 12, icon: <FiTag />, color: "#b88c2c" },
    { title: "Users", value: 215, icon: <FiUsers />, color: "#91542b" },
  ];

  const recentOrders = [
    { id: "#ORD001", customer: "Ravi", amount: "₹1200", date: "30 Jun 2025" },
    { id: "#ORD002", customer: "Meena", amount: "₹899", date: "29 Jun 2025" },
    { id: "#ORD003", customer: "Amit", amount: "₹456", date: "29 Jun 2025" },
    { id: "#ORD004", customer: "Sneha", amount: "₹1340", date: "28 Jun 2025" },
    { id: "#ORD005", customer: "Vikas", amount: "₹760", date: "28 Jun 2025" },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-[#91542b]">Welcome, Admin 👋</h1>
        <p className="text-gray-500 text-sm">Here’s a quick overview of your store</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#91542b]">Latest Orders</h2>
          <a
            href="/admin/orders"
            className="text-sm text-[#b88c2c] hover:underline"
          >
            View All
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f6f1e7]">
              <tr>
                <th className="px-4 py-3 text-[#91542b]">Order ID</th>
                <th className="px-4 py-3 text-[#91542b]">Customer</th>
                <th className="px-4 py-3 text-[#91542b]">Amount</th>
                <th className="px-4 py-3 text-[#91542b]">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fdf9f3] border-b">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.amount}</td>
                  <td className="px-4 py-3">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
