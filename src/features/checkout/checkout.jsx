import { Link } from "react-router-dom";

const sampleCartItems = [
  {
    id: 1,
    name: "Red Chilly Powder",
    image: "/assets/img/product.jpg",
    price: 260,
    quantity: 2,
  },
  {
    id: 2,
    name: "Turmeric Powder",
    image: "/assets/img/product.jpg",
    price: 180,
    quantity: 1,
  },
];

const Checkout = () => {
  const total = sampleCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-[80px] min-h-[calc(100vh-80px)] bg-white px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea rows="3" className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[#fafafa] rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

          <ul className="space-y-4 text-sm">
            {sampleCartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="text-gray-700">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-medium pt-4 border-t">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full mt-4 bg-[#91542b] hover:bg-[#333] text-white py-2 rounded-md text-sm font-medium transition">
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
