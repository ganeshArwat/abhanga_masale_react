function StatCard({ title, value, icon, color = "#b88c2c" }) {
  return (
    <div className="flex items-center p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <div
        className="p-3 rounded-full mr-4"
        style={{ backgroundColor: color + "1A", color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;
