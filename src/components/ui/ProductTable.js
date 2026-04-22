import React from "react";
import Button from "./Button";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="mt-6 space-y-4">

      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-3"
        >

          {/* TOP ROW: image + details */}
          <div className="flex items-center gap-4">

            {/* IMAGE */}
            <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAME + PRICE */}
            <div className="flex flex-col min-w-0">

              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {p.name}
              </h3>

              <p className="text-green-600 font-bold">
                R {p.price}
              </p>

            </div>

          </div>

          {/* ACTION BUTTONS (UNDERNEATH, FULL WIDTH ON MOBILE) */}
          <div className="flex gap-2">

            <Button
              onClick={() => onEdit(p)}
              className="flex-1"
            >
              Edit
            </Button>

            <Button
              variant="danger"
              onClick={() => onDelete(p.id)}
              className="flex-1"
            >
              Delete
            </Button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default ProductTable;