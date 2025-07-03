import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const WishlistCard = ({ id, name, image, currentPrice, oldPrice, onAddToCart, onRemove }) => {
  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col transition hover:shadow-xl">
      {/* Image */}
      <div className="w-full flex justify-center bg-white p-2">
        <img
          crossOrigin="anonymous"
          src={`${apiUrl}${image}`}
          alt={name}
          className="h-[230px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-grow px-4 pb-4 text-center">
        {/* Title */}
        <p className="text-lg font-semibold text-gray-800 mb-1 min-h-[48px] line-clamp-2">
          {name}
        </p>

        {/* Price */}
        <p className="mb-3">
          <span className="text-red-600 font-bold text-base">
            Rs. {currentPrice.toFixed(2)}
          </span>
          <span className="line-through text-sm text-gray-400 ml-2">
            Rs. {oldPrice.toFixed(2)}
          </span>
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(id)}
            className="flex-1 bg-[#91542b] hover:bg-[#333] text-white text-sm py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="text-base" />
            Add to Cart
          </button>

          <button
            onClick={() => onRemove(id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-2 rounded-md"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
