import React from "react";
import ProductRow from "./ProductRow";

const ProductTable = ({
  products,
  editingProductId,
  editData,
  onEdit,
  onSave,
  onCancel,
  onChange,
  onDelete,
}) => {
  return (
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
            <ProductRow
              key={product.id}
              product={product}
              isEditing={editingProductId === product.id}
              editData={editData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              onChange={onChange}
              onDelete={onDelete}
            />
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default ProductTable;