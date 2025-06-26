import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FaStar } from "react-icons/fa";
const ProductDetail = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Fetch product detail
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/getProduct/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product detail:", err);
      }
    };

    fetchProduct();
  }, [productId]);

    useEffect(() => {
    // ✅ Sample Product
    const dummyProduct = {
      id: productId,
      name: "Lal Mirchi Powder (Red Chilli Powder) – 100gm",
      image: "/assets/img/product.jpg",
      currentPrice: 260,
      oldPrice: 380,
      description: `
✔ Authentic & Pure - Made from high-quality whole red chillies, free from additives or artificial colors.
✔ Bold & Flavorful - Enhances the taste of curries, chutneys, pickles, and snacks.
✔ Perfect Balance of Heat & Aroma - Not just spicy but also packed with rich flavors.
✔ Hygienically Processed - Sealed for freshness to retain its natural potency.

📦 Pack Size: 100gm
📍 Best Before: 12 months from the date of packaging
✅ 100% Natural | No Preservatives | No Artificial Colors
      `,
      rating: 4.9,
      reviews: "9.2k",
      sold: "10k",
    };

    // ✅ Sample Similar Products
    const dummySimilar = [
      {
        id: "1",
        name: "Haldi Powder – 100gm",
        currentPrice: 120,
        oldPrice: 160,
        image: "/assets/img/product.jpg",
      },
      {
        id: "2",
        name: "Garam Masala – 100gm",
        currentPrice: 180,
        oldPrice: 220,
        image: "/assets/img/product.jpg",
      },
      {
        id: "3",
        name: "Kashmiri Mirch – 100gm",
        currentPrice: 150,
        oldPrice: 200,
        image: "/assets/img/product.jpg",
      },
      {
        id: "4",
        name: "Sabji Masala – 100gm",
        currentPrice: 90,
        oldPrice: 130,
        image: "/assets/img/product.jpg",
      },
    ];

    setProduct(dummyProduct);
    setSimilarProducts(dummySimilar);
  }, [productId]);

  // Fetch similar products
  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await fetch(`/random_products/${productId}`);
        const data = await res.json();
        setSimilarProducts(data);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchSimilar();
  }, [productId]);

  if (!product)
    return (
      <div className="pt-[80px] min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );

  return (
    <main className="pt-[80px] px-4 md:px-10 pb-12 bg-white min-h-screen">
      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Image */}
        <div className="w-full flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[70%] h-auto object-contain rounded-md shadow"
          />
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-700">{product.name}</h1>

          {/* Ratings */}
          <div className="flex gap-6 text-sm text-gray-600 items-center">
            <div className="flex items-center gap-3">
              <FaStar /> <span>({product.rating || "4.9"})</span>
            </div>
            <div>{product.reviews || "9.2k"} Reviews</div>
            <div>{product.sold || "10k"} Sold</div>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-xl font-semibold text-red-600">Rs. {product.currentPrice}</p>
            <p className="text-sm text-gray-500">
              M.R.P.:{" "}
              <span className="line-through text-gray-400">Rs. {product.oldPrice}</span>
            </p>
          </div>

          {/* Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="w-full sm:w-auto bg-[#91542b] hover:bg-[#333] text-white py-2 px-6 rounded-md md:px-9">
                Add to Cart
            </button>
            <button className="w-full sm:w-auto bg-[#b88c2c] hover:bg-[#333] text-white py-2 px-6 rounded-md md:px-9">
                Buy Now
            </button>
        </div>

          {/* Description */}
          <div className="pt-4 space-y-1">
            <h4 className="text-lg font-semibold">Description</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
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
