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
import Button from "../../ui/Button";

const MenuManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});
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

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-6">
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
        editingProductId={editingProductId}
        editData={editData}
        onEdit={(p) => {
          setEditingProductId(p.id);
          setEditData(p);
        }}
        onSave={async (id) => {
          await updateProduct(id, editData);
          setEditingProductId(null);
          loadProducts();
        }}
        onCancel={() => {
          setEditingProductId(null);
          setEditData({});
        }}
        onChange={setEditData}
        onDelete={async (id) => {
          await deleteProduct(id);
          loadProducts();
        }}
      />

    </div>
  );
};

export default MenuManagementPage;