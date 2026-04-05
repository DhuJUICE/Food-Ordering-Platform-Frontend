import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../apiComponents/api-products";

const MenuManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});
  const [addingNew, setAddingNew] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const loadProducts = async () => {
    const data = await fetchProducts();
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(productId);
      if (result) loadProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditData({});
  };

  const handleSaveEdit = async (productId) => {
    await updateProduct(productId, editData);
    setEditingProductId(null);
    setEditData({});
    loadProducts();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (
      !newProductData.name ||
      !newProductData.price
    ) {
      alert("Please fill in all required fields");
      return;
    }

    await createProduct(newProductData);
    setAddingNew(false);
    setNewProductData({
      name: "",
      price: "",
      image: "",
    });
    loadProducts();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6"><center>Menu Management</center></h1>

      {/* Add Product Section */}
      {!addingNew && (
        <button
          onClick={() => setAddingNew(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-6 transition-colors"
        >
          Add Menu Item
        </button>
      )}

      {addingNew && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Name"
              value={newProductData.name}
              onChange={handleNewChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={newProductData.price}
              onChange={handleNewChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              name="image"
              placeholder="Image URL"
              value={newProductData.image}
              onChange={handleNewChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setAddingNew(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price (R)</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-1 w-full"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input
                        name="price"
                        type="number"
                        value={editData.price}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-1 w-full"
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td className="p-3 flex flex-col md:flex-row gap-2">
                    {editingProductId === product.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(product.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuManagementPage;