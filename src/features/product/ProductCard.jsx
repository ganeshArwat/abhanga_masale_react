import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, image, currentPrice, oldPrice }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center transition hover:shadow-xl mx-auto">
      {/* Image */}
      <div className="w-full flex justify-center bg-white p-1">
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

          <Link
            to={`/product/${id}`}
            className="inline-block w-full bg-[#91542b] hover:bg-[#333] text-white text-sm font-medium py-2 rounded-md transition"
          >
            View Product
          </Link>
      </div>
    </div>
  );
};

export default ProductCard;