import ProductCard from './ProductCard';

const ProductList = ({ products = [], loading }) => {
  return (
    <div className="w-full">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          All Products
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-700 font-medium text-sm">
            Sort By
          </label>
          <select
            name="sort"
            id="sort"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 text-sm">Loading products...</p>
      )}

      {/* No Products */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 text-sm">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
