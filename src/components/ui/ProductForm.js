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
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6 border">

      <h2 className="text-lg md:text-xl font-semibold mb-4">
        New Product
      </h2>

      <div className="grid grid-cols-1 gap-3">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          className="border p-2 rounded-md w-full"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={onChange}
          className="border p-2 rounded-md w-full"
        />

        <input
          type="file"
          onChange={onFile}
          className="border p-2 rounded-md w-full"
        />

      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">

        <Button
          onClick={onSubmit}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? "Uploading..." : "Save"}
        </Button>

        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>

      </div>

    </div>
  );
};

export default ProductForm;