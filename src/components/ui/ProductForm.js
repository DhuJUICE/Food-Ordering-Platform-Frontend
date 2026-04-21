import React from "react";
import Button from "./Button";

const ProductForm = ({
  form,
  onChange,
  onFile,
  onSubmit,
  onCancel,
  loading,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border">

      <h2 className="text-xl font-semibold mb-4">New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          className="border p-2 rounded-md"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={onChange}
          className="border p-2 rounded-md"
        />

        <input
          type="file"
          onChange={onFile}
          className="border p-2 rounded-md md:col-span-2"
        />

      </div>

      <div className="flex gap-3 mt-4">

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Save"}
        </Button>

        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

      </div>

    </div>
  );
};

export default ProductForm;