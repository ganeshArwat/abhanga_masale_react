import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi'; // outline heart
import { FaHeart } from 'react-icons/fa'; // filled heart
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductCard = ({ slug, name, image, currentPrice, oldPrice, _id }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist.some((item) => item._id === _id));
  }, [wishlist, _id]);

  const handleWishlist = () => {
    dispatch(toggleWishlist(_id));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col transition hover:shadow-xl mx-auto h-full">
      {/* Image */}
      <div className="w-full flex justify-center bg-white p-1">
        <img
          crossOrigin="anonymous"
          src={`${apiUrl}${image}`}
          alt={name}
          className="h-[270px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between px-4 pb-4 text-center flex-grow">
        <p className="text-lg font-semibold text-gray-800 mb-1 min-h-[48px] line-clamp-2">
          {name}
        </p>

        <p className="mb-3">
          <span className="text-red-600 font-bold text-base">
            Rs. {currentPrice.toFixed(2)}
          </span>
          <span className="line-through text-sm text-gray-400 ml-2">
            Rs. {oldPrice.toFixed(2)}
          </span>
        </p>

        <div className="flex gap-2">
          <Link
            to={`/product/${slug}`}
            className="w-full flex-1 bg-[#91542b] hover:bg-[#333] text-white text-sm font-medium py-2 rounded-md transition text-center"
          >
            View
          </Link>
          <button
            title="Toggle Wishlist"
            onClick={handleWishlist}
            className={`p-2 border ${
              isWishlisted ? "bg-[#91542b] text-white" : "border-[#91542b] text-[#91542b]"
            } hover:bg-[#91542b] hover:text-white rounded-md transition`}
          >
            {isWishlisted ? <FaHeart className="w-4 h-4" /> : <FiHeart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
