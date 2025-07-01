import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ProductFormModal from "./ProductFormModal";

const mockProducts = [
  {
    id: 1,
    name: "Red Chilli Powder",
    price: 120,
    stock: 40,
    image: "/assets/img/product.jpg",
  },
  {
    id: 2,
    name: "Turmeric Powder",
    price: 90,
    stock: 60,
    image: "/assets/img/product.jpg",
  },
];

function ProductList() {
  const [products, setProducts] = useState(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditData(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editData) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editData.id ? { ...p, ...data } : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...data, id: Date.now(), image: "/assets/products/default.jpg" },
      ]);
    }
    setIsModalOpen(false);
  };

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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
            <thead className="bg-[#f6f1e7] text-left">
            <tr>
                <th className="px-6 py-4 text-[#91542b]">Image</th>
                <th className="px-6 py-4 text-[#91542b]">Name</th>
                <th className="px-6 py-4 text-[#91542b]">Price</th>
                <th className="px-6 py-4 text-[#91542b]">Stock</th>
                <th className="px-6 py-4 text-[#91542b] text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((prod) => (
                <tr
                key={prod.id}
                className="hover:bg-[#fdf9f3] border-b last:border-none transition"
                >
                <td className="px-6 py-4">
                    <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-12 w-12 rounded-md object-cover border"
                    />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{prod.name}</td>
                <td className="px-6 py-4">₹{prod.price}</td>
                <td className="px-6 py-4">{prod.stock}</td>
                <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                    <button
                        onClick={() => openEditModal(prod)}
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FiEdit />
                    </button>
                    <button
                        onClick={() =>
                        setProducts((prev) => prev.filter((p) => p.id !== prod.id))
                        }
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 />
                    </button>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </div>
  );
}

export default ProductList;
