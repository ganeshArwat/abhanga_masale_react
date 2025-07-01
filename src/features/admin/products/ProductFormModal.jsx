import { useEffect, useState } from "react";

function ProductFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    setName(initialData?.name || "");
    setPrice(initialData?.price || "");
    setStock(initialData?.stock || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, stock });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-[#91542b] mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600">Stock</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#91542b] text-white rounded-md hover:bg-[#333]"
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
