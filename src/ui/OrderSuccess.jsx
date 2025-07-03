import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-[80px] pb-16 bg-white">
      <div className="max-w-md w-full bg-[#f9f9f9] border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-5xl" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for your purchase. Your order has been placed and is being processed. You will receive a confirmation email shortly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/orders"
            className="w-full bg-[#91542b] hover:bg-[#333] text-white py-2 rounded-md text-sm font-medium transition"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="text-[#91542b] text-sm hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
