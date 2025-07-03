import { useState } from "react";

export default function SideBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    price: [],
  });

  const handleChange = (section, value) => {
    setFilters((prev) => {
      const currentSection = prev[section];
      const updatedSection = currentSection.includes(value)
        ? currentSection.filter((v) => v !== value)
        : [...currentSection, value];

      const updatedFilters = { ...prev, [section]: updatedSection };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <aside className="w-full md:w-64 md:h-screen h-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm overflow-y-auto">
      <div className="space-y-8">
          {/* Price Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Price Range</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            {[
              { label: "< ₹100", value: "lt100" },
              { label: "₹100 - ₹300", value: "100to300" },
              { label: "> ₹300", value: "gt300" },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.price.includes(value)}
                  onChange={() => handleChange("price", value)}
                  className="accent-[#91542b]"
                />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Category Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Category</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            {["veg", "nonveg"].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes(value)}
                  onChange={() => handleChange("category", value)}
                  className="accent-[#91542b]"
                />
                <span className="text-gray-700 text-sm capitalize">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Availability</h4>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            {["inStock", "outOfStock"].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(value)}
                  onChange={() => handleChange("availability", value)}
                  className="accent-[#91542b]"
                />
                <span className="text-gray-700 text-sm">
                  {value === "inStock" ? "In Stock" : "Out of Stock"}
                </span>
              </label>
            ))}
          </div>
        </div>

      
      </div>
    </aside>
  );
}
