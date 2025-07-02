import { useEffect, useState, useMemo } from 'react';
import SideBar from '../../ui/SideBar';
import ProductList from './ProductList';
import { fetchProducts } from '../../features/product/productAPI';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('new');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data); // ensure `data` is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortOption === 'new') {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'old') {
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'priceLowHigh') {
      return sorted.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortOption === 'priceHighLow') {
      return sorted.sort((a, b) => b.currentPrice - a.currentPrice);
    }
    return sorted;
  }, [products, sortOption]);

  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-[250px]">
          <SideBar />
        </aside>

        {/* Product List */}
        <section className="flex-1">
          <ProductList
            products={sortedProducts}
            loading={loading}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </section>
      </div>
    </div>
  );
};

export default AllProducts;
