import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../apiComponents/api-products";

import { uploadImage } from "../../apiComponents/api-image";

import ProductTable from "../../ui/ProductTable";
import ProductForm from "../../ui/ProductForm";
import ProductEditModal from "../../ui/ProductEditModal";
import Button from "../../ui/Button";

const MenuManagementPage = () => {
  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [addingNew, setAddingNew] = useState(false);

  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const loadProducts = async () => {
    const data = await fetchProducts();
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    let imageUrl = newProductData.image;

    if (imageUrl instanceof File) {
      setUploadingImage(true);
      imageUrl = await uploadImage(imageUrl);
      setUploadingImage(false);
    }

    await createProduct({
      name: newProductData.name,
      price: newProductData.price,
      image: imageUrl,
    });

    setAddingNew(false);
    setNewProductData({ name: "", price: "", image: null });
    loadProducts();
  };

  const handleSaveEdit = async (id, updatedData) => {
    await updateProduct(id, updatedData);
    setEditingProduct(null);
    loadProducts();
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Menu Management
      </h1>

      {!addingNew && (
        <Button onClick={() => setAddingNew(true)}>
          Add Menu Item
        </Button>
      )}

      {addingNew && (
        <ProductForm
          form={newProductData}
          onChange={(e) =>
            setNewProductData({
              ...newProductData,
              [e.target.name]: e.target.value,
            })
          }
          onFile={(e) =>
            setNewProductData({
              ...newProductData,
              image: e.target.files[0],
            })
          }
          onSubmit={handleAddProduct}
          onCancel={() => setAddingNew(false)}
          loading={uploadingImage}
        />
      )}

      <ProductTable
        products={products}
        onEdit={(product) => setEditingProduct(product)}
        onDelete={async (id) => {
          await deleteProduct(id);
          loadProducts();
        }}
      />

      {/* EDIT MODAL */}
      <ProductEditModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
      />

    </div>
  );
};

export default MenuManagementPage;