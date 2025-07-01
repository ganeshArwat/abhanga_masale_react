import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import CategoryFormModal from "./CategoryFormModal";

const mockCategories = [
  { id: 1, name: "Spices", slug: "spices" },
  { id: 2, name: "Bakery Premix", slug: "bakery-premix" },
];

function CategoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState(mockCategories);

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditData(cat);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editData) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editData.id ? { ...c, ...data } : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { ...data, id: Date.now() }, // temporary ID
      ]);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#91542b]">Categories</h2>
        <button
          onClick={openAddModal}
          className="bg-[#91542b] hover:bg-[#91542b] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-[#f6f1e7]">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-[#91542b]">#</th>
              <th className="px-5 py-3 text-left font-semibold text-[#91542b]">Name</th>
              <th className="px-5 py-3 text-left font-semibold text-[#91542b]">Slug</th>
              <th className="px-5 py-3 text-left font-semibold text-[#91542b]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr
                key={cat.id}
                className="hover:bg-[#fdf9f3] transition-all border-b border-gray-100"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">{cat.name}</td>
                <td className="px-5 py-4">{cat.slug}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => openEditModal(cat)}
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editData}
      />
    </div>
  );
}

export default CategoryList;
