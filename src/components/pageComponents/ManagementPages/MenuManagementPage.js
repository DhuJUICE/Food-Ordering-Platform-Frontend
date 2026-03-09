// MenuManagementPage.js
import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct, // new function
} from "../../apiComponents/api-products";

const MenuManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});
  const [addingNew, setAddingNew] = useState(false);
  const [newProductData, setNewProductData] = useState({
    prodName: "",
    prodPrice: "",
    prodDesc: "",
    prodAvailQuant: "",
    prodImagePath: "",
  });

  // Load products
  const loadProducts = async () => {
    const data = await fetchProducts();
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(productId);
      if (result) loadProducts();
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditData({
      prodName: product.prodName,
      prodPrice: product.prodPrice,
      prodDesc: product.prodDesc,
      prodAvailQuant: product.prodAvailQuant,
      prodImagePath: product.prodImagePath,
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditData({});
  };

  // Save edited product
  const handleSaveEdit = async (productId) => {
    await updateProduct(productId, editData);
    setEditingProductId(null);
    setEditData({});
    loadProducts();
  };

  // Handle input changes for edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for new product
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new product
  const handleAddProduct = async () => {
    if (
      !newProductData.prodName ||
      !newProductData.prodPrice ||
      !newProductData.prodDesc ||
      !newProductData.prodAvailQuant
    ) {
      alert("Please fill in all required fields");
      return;
    }
    await createProduct(newProductData);
    setAddingNew(false);
    setNewProductData({
      prodName: "",
      prodPrice: "",
      prodDesc: "",
      prodAvailQuant: "",
      prodImagePath: "",
    });
    loadProducts();
  };

  return (
    <div>
      <h1>Menu Management</h1>

      {/* Add Menu Item Button */}
      {!addingNew && (
        <button onClick={() => setAddingNew(true)}>Add Menu Item</button>
      )}

      {/* Add New Product Form */}
      {addingNew && (
        <div style={{ margin: "20px 0", border: "1px solid #ccc", padding: "10px" }}>
          <h3>New Product</h3>
          <input
            name="prodName"
            placeholder="Name"
            value={newProductData.prodName}
            onChange={handleNewChange}
          />
          <input
            name="prodPrice"
            type="number"
            placeholder="Price"
            value={newProductData.prodPrice}
            onChange={handleNewChange}
          />
          <input
            name="prodAvailQuant"
            type="number"
            placeholder="Quantity"
            value={newProductData.prodAvailQuant}
            onChange={handleNewChange}
          />
          <input
            name="prodDesc"
            placeholder="Description"
            value={newProductData.prodDesc}
            onChange={handleNewChange}
          />
          <input
            name="prodImagePath"
            placeholder="Image URL"
            value={newProductData.prodImagePath}
            onChange={handleNewChange}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleAddProduct}>Save</button>
            <button onClick={() => setAddingNew(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (R)</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.prodImagePath || "https://via.placeholder.com/50"}
                    alt={product.prodName}
                    width="50"
                  />
                </td>

                <td>
                  {editingProductId === product.id ? (
                    <input
                      name="prodName"
                      value={editData.prodName}
                      onChange={handleChange}
                    />
                  ) : (
                    product.prodName
                  )}
                </td>

                <td>
                  {editingProductId === product.id ? (
                    <input
                      name="prodPrice"
                      type="number"
                      value={editData.prodPrice}
                      onChange={handleChange}
                    />
                  ) : (
                    product.prodPrice
                  )}
                </td>

                <td>
                  {editingProductId === product.id ? (
                    <input
                      name="prodAvailQuant"
                      type="number"
                      value={editData.prodAvailQuant}
                      onChange={handleChange}
                    />
                  ) : (
                    product.prodAvailQuant
                  )}
                </td>

                <td>
                  {editingProductId === product.id ? (
                    <input
                      name="prodDesc"
                      value={editData.prodDesc}
                      onChange={handleChange}
                    />
                  ) : (
                    product.prodDesc
                  )}
                </td>

                <td>
                  {editingProductId === product.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(product.id)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MenuManagementPage;