import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ProductFormModal from "./ProductFormModal";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "./productAPI";
import { fetchCategories } from "../../category/categoryAPI";
const apiUrl = import.meta.env.VITE_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriess = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await updateProduct(editData._id, formData);
      } else {
        await createProduct(formData);
      }
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditData(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriess();
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#91542b]">Products</h2>
        <button
          onClick={openAddModal}
          className="bg-[#91542b] hover:bg-[#333] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-[#f6f1e7] text-left">
              <tr>
                <th className="px-6 py-4 text-[#91542b]">Image</th>
                <th className="px-6 py-4 text-[#91542b]">Name</th>
                <th className="px-6 py-4 text-[#91542b]">Price</th>
                <th className="px-6 py-4 text-[#91542b]">Category</th>
                <th className="px-6 py-4 text-[#91542b]">Rating</th>
                <th className="px-6 py-4 text-[#91542b] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-[#fdf9f3] border-b last:border-none transition">
                  <td className="px-6 py-4">
                    <img crossOrigin="anonymous" src={`${apiUrl}${prod.image}`} alt={prod.name} className="h-12 w-12 rounded-md object-cover border" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{prod.name}</td>
                  <td className="px-6 py-4">₹{prod.currentPrice}</td>
                  <td className="px-6 py-4">{prod.category?.name || "—"}</td>
                  <td className="px-6 py-4">{prod.rating}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => openEditModal(prod)} title="Edit" className="text-blue-600 hover:text-blue-800">
                        <FiEdit />
                      </button>
                      <button onClick={() => handleDelete(prod._id)} title="Delete" className="text-red-600 hover:text-red-800">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-6">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
        categories={categories}
      />
    </div>
  );
}

export default ProductList;
