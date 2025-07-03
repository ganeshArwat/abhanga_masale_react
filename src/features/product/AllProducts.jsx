import { useEffect, useState, useMemo } from "react";
import SideBar from "../../ui/SideBar";
import ProductList from "./ProductList";
import { fetchProducts } from "../../features/product/productAPI";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("new");
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    price: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setFilteredProducts(data); // default = no filters
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    // Apply filters to allProducts
    let temp = [...allProducts];

    // Category filter
    if (filters.category.length) {
      temp = temp.filter((p) => filters.category.includes(p.category?.toLowerCase()));
    }

    // Availability filter (assume `p.inStock` boolean exists)
    if (filters.availability.length) {
      temp = temp.filter((p) => {
        if (filters.availability.includes("inStock") && p.inStock) return true;
        if (filters.availability.includes("outOfStock") && !p.inStock) return true;
        return false;
      });
    }

    // Price filter
    if (filters.price.length) {
      temp = temp.filter((p) => {
        const price = p.currentPrice;
        return filters.price.some((range) => {
          if (range === "lt100") return price < 100;
          if (range === "100to300") return price >= 100 && price <= 300;
          if (range === "gt300") return price > 300;
          return true;
        });
      });
    }

    setFilteredProducts(temp);
  }, [filters, allProducts]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOption === "priceLowHigh") {
      return sorted.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortOption === "priceHighLow") {
      return sorted.sort((a, b) => b.currentPrice - a.currentPrice);
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen bg-white overflow-y-auto px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-[250px]">
          <SideBar onFilterChange={setFilters} />
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
