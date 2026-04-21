import React from "react";
import Button from "./Button";

const ProductRow = ({
  product,
  isEditing,
  editData,
  onEdit,
  onSave,
  onCancel,
  onChange,
  onDelete,
}) => {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">

      {/* IMAGE */}
      <td className="p-3">
        <img
          src={product.image || "https://via.placeholder.com/50"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      {/* NAME */}
      <td className="p-3">
        {isEditing ? (
          <input
            name="name"
            value={editData.name}
            onChange={(e) =>
              onChange({ ...editData, name: e.target.value })
            }
            className="border rounded-md p-1 w-full"
          />
        ) : (
          product.name
        )}
      </td>

      {/* PRICE */}
      <td className="p-3">
        {isEditing ? (
          <input
            name="price"
            type="number"
            value={editData.price}
            onChange={(e) =>
              onChange({ ...editData, price: e.target.value })
            }
            className="border rounded-md p-1 w-full"
          />
        ) : (
          product.price
        )}
      </td>

      {/* ACTIONS */}
      <td className="p-3 flex gap-2">

        {isEditing ? (
          <>
            <Button onClick={() => onSave(product.id)}>
              Save
            </Button>

            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => onEdit(product)}>
              Edit
            </Button>

            <Button variant="danger" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          </>
        )}

      </td>

    </tr>
  );
};

export default ProductRow;