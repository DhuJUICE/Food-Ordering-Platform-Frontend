import React from "react";
import Button from "./Button";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItem = ({
  item,
  loading,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 rounded-lg shadow p-4">

      {/* Image */}
      <img
        src={item.product_image || "/default-image.jpg"}
        alt={item.product_name}
        className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.product_name}
        </h3>

        <p className="text-green-600 font-bold mt-1">
          R {item.product_price}
        </p>

        <p className="text-gray-700 mt-2">
          Quantity: {item.quantity}
        </p>

        <p className="text-gray-800 font-medium mt-1">
          Total: R {(item.product_price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center space-y-2 mt-4 sm:mt-0">

        <Button
          onClick={() => onIncrement(item)}
          disabled={loading}
          className="w-10 h-10 p-0"
        >
          <FaPlus />
        </Button>

        <Button
          onClick={() => onDecrement(item)}
          disabled={loading}
          className="w-10 h-10 p-0 bg-yellow-400 hover:bg-yellow-500"
        >
          <FaMinus />
        </Button>

        <Button
          onClick={() => onRemove(item)}
          disabled={loading}
          variant="danger"
          className="w-10 h-10 p-0"
        >
          <FaTrash />
        </Button>

      </div>
    </div>
  );
};

export default CartItem;