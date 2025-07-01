import { useEffect, useState } from "react";

function CategoryFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  
  useEffect(() => {
    setName(initialData?.name || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    onSubmit({ name, slug });
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-[#91542b] mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#91542b] text-white rounded-md hover:bg-[#ccc]"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryFormModal;
