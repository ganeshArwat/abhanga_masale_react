import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import CategoryFormModal from "./CategoryFormModal";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryAPI";
import { toast } from "react-hot-toast";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditData(cat);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editData) {
        const updated = await updateCategory(editData._id, data);
        setCategories((prev) =>
          prev.map((c) => (c._id === editData._id ? updated : c))
        );
        toast.success("Category updated");
      } else {
        const created = await createCategory(data);
        setCategories((prev) => [created, ...prev]);
        toast.success("Category added");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch (err) {
      toast.error("Failed to delete");
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
            {loading ? (
              <tr>
                <td className="px-5 py-4" colSpan={4}>
                  Loading...
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr
                  key={cat._id}
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
                        onClick={() => handleDelete(cat._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
