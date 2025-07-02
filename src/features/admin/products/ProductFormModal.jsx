import { useEffect, useRef, useState } from "react";

function ProductFormModal({ isOpen, onClose, onSubmit, initialData, categories }) {
  const inputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    currentPrice: "",
    oldPrice: "",
    description: "",
    image: null,
    category: "",
    rating: 0,
    reviews: "0",
    sold: "0",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        currentPrice: initialData.currentPrice || "",
        oldPrice: initialData.oldPrice || "",
        description: initialData.description || "",
        image: null,
        category: initialData.category || "",
        rating: initialData.rating || 0,
        reviews: initialData.reviews || "0",
        sold: initialData.sold || "0",
      });
    } else {
      setForm({
        name: "",
        currentPrice: "",
        oldPrice: "",
        description: "",
        image: null,
        category: "",
        rating: 0,
        reviews: "0",
        sold: "0",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });
    onSubmit(formData);
    onClose();
  };

  const handleCancel = () => {
    setForm({
      name: "",
      currentPrice: "",
      oldPrice: "",
      description: "",
      image: null,
      category: "",
      rating: 0,
      reviews: "0",
      sold: "0",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-[#91542b] mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Product Name</label>
            <input
              name="name"
              type="text"
              required
              ref={inputRef}
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              placeholder="e.g. Lal Mirchi Powder"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-600">Current Price (₹)</label>
              <input
                name="currentPrice"
                type="number"
                required
                value={form.currentPrice}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-600">Old Price (₹)</label>
              <input
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Description</label>
            <textarea
              name="description"
              rows={3}
              required
              value={form.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              placeholder="Short description or key highlights"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Category</label>
            <select
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-600">Rating (0-5)</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-600">Reviews (e.g. 9.2k)</label>
              <input
                name="reviews"
                type="text"
                value={form.reviews}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 text-gray-600">Sold (e.g. 10k)</label>
              <input
                name="sold"
                type="text"
                value={form.sold}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#91542b] text-white rounded-md hover:bg-[#7a4125] text-sm"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
