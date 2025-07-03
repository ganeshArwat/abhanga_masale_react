import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios"; // assuming you have axios setup

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      return alert("Please fill all required fields");
    }

    try {
      const payload = {
        shippingInfo: form,
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      };

      const res = await axios.post("/orders", payload); // 🔁 Adjust route if needed

      if (res.status === 201 || res.data.status === "success") {
        dispatch(clearCart());
        navigate("/order-success");
      }
    } catch (err) {
      console.error("Order failed", err);
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <div className="pt-[80px] min-h-[calc(100vh-80px)] bg-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[#fafafa] rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

          <ul className="space-y-4 text-sm">
            {items.map((item) => (
              <li key={item.product._id} className="flex justify-between items-center border-b pb-2">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-gray-700">₹{item.product.currentPrice * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-medium pt-4 border-t">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-[#91542b] hover:bg-[#333] text-white py-2 rounded-md text-sm font-medium transition"
          >
            Place Order
          </button>
          <Link
            to="/cart"
            className="block text-center text-[#91542b] text-sm hover:underline"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
