import { useEffect, useState } from 'react';
import SideBar from '../../ui/SideBar';
import ProductList from './ProductList';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = Array(12).fill({
          id: 1,
          name: "Red Chilly",
          currentPrice: 260,
          oldPrice: 380,
          image: "/assets/img/product.jpg",
        });

        setProducts(dummyData);
        setLoading(false);
      }, 800);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar (stacked on mobile) */}
        <aside className="w-full lg:w-[250px]">
          <SideBar />
        </aside>

        {/* Product List */}
        <section className="flex-1">
          {loading ? (
            <div className="text-center text-[#91542b] font-medium text-lg mt-10">
              Loading products...
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </section>
      </div>
    </div>
  );
};

export default AllProducts;
