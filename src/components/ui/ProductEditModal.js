import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { uploadImage } from "../apiComponents/api-image";

const ProductEditModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [newImageFile, setNewImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
      });

      setPreview(product.image || "");
      setNewImageFile(null);
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

    const handleSubmit = async () => {
    let finalImage = form.image;

    if (newImageFile) {
        const uploaded = await uploadImage(newImageFile);

        console.log("UPLOAD RESPONSE:", uploaded);

        // 👇 SAFE CHECK
        finalImage =
        typeof uploaded === "string"
            ? uploaded
            : uploaded?.url || uploaded?.image || "";
    }

    console.log("FINAL IMAGE:", finalImage);

    onSave(product.id, {
        name: form.name,
        price: form.price,
        image: finalImage,
    });
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">

        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <div className="space-y-4">

          {/* IMAGE PREVIEW */}
          <div className="flex flex-col items-center gap-3">

            <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100">
              <img
                src={preview}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              onClick={() => fileInputRef.current.click()}
              variant="outline"
            >
              Change Image
            </Button>

          </div>

          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Product name"
          />

          {/* PRICE */}
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Price"
            type="number"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Save
          </Button>

        </div>

      </div>

    </div>
  );
};

export default ProductEditModal;