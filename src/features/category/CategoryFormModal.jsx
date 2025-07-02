import { useEffect, useRef, useState } from "react";

function CategoryFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setName(initialData?.name || "");
  }, [initialData]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const slug = trimmed.toLowerCase().replace(/\s+/g, "-");
    onSubmit({ name: trimmed });

    setName("");
    onClose();
  };

  const handleCancel = () => {
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-[#91542b] mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              required
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-[#b88c2c]"
              placeholder="e.g. Spices or Bakery Premix"
            />
            {name && (
              <p className="text-xs text-gray-400 mt-1">
                Slug: <span className="text-[#91542b]">{name.toLowerCase().replace(/\s+/g, "-")}</span>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
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

export default CategoryFormModal;
