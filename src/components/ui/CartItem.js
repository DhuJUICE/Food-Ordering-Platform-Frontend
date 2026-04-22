import React from "react";
import IconButton from "./IconButton";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItem = ({
  item,
  loading,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 bg-gray-50 rounded-lg shadow p-3 sm:p-4">

      {/* LEFT SIDE: IMAGE + INFO */}
      <div className="flex items-center gap-3 w-full">

        {/* IMAGE */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-md bg-gray-100">
          <img
            src={item.product_image || "/default-image.jpg"}
            alt={item.product_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
            {item.product_name}
          </h3>

          <p className="text-gray-700 text-xs sm:text-sm">
            R {item.product_price} •{" "}
            <span className="font-semibold text-gray-900">
              x{item.quantity}
            </span>
          </p>

          <p className="text-gray-800 font-semibold text-sm sm:text-base">
            Total: R {(item.product_price * item.quantity).toFixed(2)}
          </p>
        </div>

      </div>

      {/* RIGHT SIDE: ACTIONS */}
      <div className="flex justify-end sm:flex-col gap-3 sm:ml-auto">

        <IconButton
          size="sm"
          onClick={() => onIncrement(item)}
          disabled={loading}
        >
          <FaPlus />
        </IconButton>

        <IconButton
          size="sm"
          variant="outline"
          onClick={() => onDecrement(item)}
          disabled={loading}
        >
          <FaMinus />
        </IconButton>

        <IconButton
          size="sm"
          variant="danger"
          onClick={() => onRemove(item)}
          disabled={loading}
        >
          <FaTrash />
        </IconButton>

      </div>

    </div>
  );
};

export default CartItem;