export default function SideBar() {
  return (
    <aside className="w-full md:w-64 md:h-screen h-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm overflow-y-auto">
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Category</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" id="category-veg" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">Veg</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="category-nonveg" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">Non-Veg</span>
            </label>
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Availability</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" id="availability-in-stock" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">In Stock</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="availability-out-stock" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">Out of Stock</span>
            </label>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Price Range</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" id="price-lt-100" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">&lt; ₹100</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="price-100-300" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">₹100 - ₹300</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" id="price-gt-300" className="accent-[#91542b]" />
              <span className="text-gray-700 text-sm">&gt; ₹300</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
