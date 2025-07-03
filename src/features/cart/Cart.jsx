import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { updateCartQuantity } from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (productId, currentQty) => {
    dispatch(updateCartQuantity({ productId, quantity: currentQty + 1 }));
  };

  const handleDecrease = (productId, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateCartQuantity({ productId, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.currentPrice * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row items-center gap-4 border rounded-md p-4 shadow-sm"
                >
                  <img
                    crossOrigin="anonymous"
                    src={import.meta.env.VITE_API_URL + item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.product.currentPrice}
                    </p>

                    {/* Quantity control */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          handleDecrease(item.product._id, item.quantity)
                        }
                        className="px-2 bg-gray-200 rounded-md text-sm font-medium"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleIncrease(item.product._id, item.quantity)
                        }
                        className="px-2 bg-gray-200 rounded-md text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-bold">
                      ₹{item.product.currentPrice * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="mt-2 text-gray-500 hover:text-red-600 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="bg-[#fafafa] rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="w-full bg-[#91542b] hover:bg-[#333] text-white py-2 rounded-md text-sm font-medium transition">
              <Link to="/checkout">Proceed to Checkout</Link>
            </button>
            <Link
              to="/"
              className="block text-center text-[#91542b] text-sm hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
