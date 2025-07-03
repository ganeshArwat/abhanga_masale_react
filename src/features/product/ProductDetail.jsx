import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { FaStar } from "react-icons/fa";
import { fetchProductBySlug, fetchSimilarProducts } from "../../features/product/productAPI";
import { addToCart } from "../../features/cart/cartSlice";
const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from 'react-hot-toast';
import { useRef } from "react";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const topRef = useRef(null);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductBySlug(productSlug);
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productSlug]);

  useEffect(() => {
    const loadSimilar = async () => {
      try {
        const similar = await fetchSimilarProducts(productSlug);
        setSimilarProducts(similar);
      } catch (error) {
        console.error("Error loading similar products:", error);
        setSimilarProducts([]);
      }
    };

    loadSimilar();
  }, [productSlug]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [productSlug]);

  if (loading || !product)
    return (
      <div className="pt-[80px] min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );

  const handleAddToCart = () => {
    if (!token) return toast.error("Please log in to add to cart");
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .then(() => toast.success("Item added to cart"))
      .catch(() => toast.error("Error adding to cart"));
  };

  return (
    <main ref={topRef} className="pt-[80px] px-4 md:px-10 pb-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full flex justify-center">
          <img
            crossOrigin="anonymous"
            src={`${apiUrl}${product.image}`}
            alt={product.name}
            className="w-[70%] h-auto object-contain rounded-md shadow"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-700">{product.name}</h1>

          <div className="flex gap-6 text-sm text-gray-600 items-center">
            <div className="flex items-center gap-3">
              <FaStar /> <span>({product.rating || "4.9"})</span>
            </div>
            <div>{product.reviews || "9.2k"} Reviews</div>
            <div>{product.sold || "10k"} Sold</div>
          </div>

          <div className="space-y-1">
            <p className="text-xl font-semibold text-red-600">Rs. {product.currentPrice}</p>
            <p className="text-sm text-gray-500">
              M.R.P.: <span className="line-through text-gray-400">Rs. {product.oldPrice}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-[#91542b] hover:bg-[#333] text-white py-2 px-6 rounded-md md:px-9"
            >
              Add to Cart
            </button>
            <button className="w-full sm:w-auto bg-[#b88c2c] hover:bg-[#333] text-white py-2 px-6 rounded-md md:px-9">
              Buy Now
            </button>
          </div>

          <div className="pt-4 space-y-1">
            <h4 className="text-lg font-semibold">Description</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">You may also like</h2>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
