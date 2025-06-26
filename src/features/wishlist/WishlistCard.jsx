import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const WishlistCard = ({ id, name, image, currentPrice, oldPrice, onAddToCart, onRemove }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center transition hover:shadow-xl mx-auto">
      {/* Image */}
      <div className="w-full flex justify-center bg-white p-2">
        <img
          src={image}
          alt={name}
          className="h-[270px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4 text-center w-full">
        <p className="text-lg font-semibold text-gray-800 mb-1">{name}</p>

        <p className="mb-3">
          <span className="text-red-600 font-bold text-base">
            Rs. {currentPrice.toFixed(2)}
          </span>
          <span className="line-through text-sm text-gray-400 ml-2">
            Rs. {oldPrice.toFixed(2)}
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
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
