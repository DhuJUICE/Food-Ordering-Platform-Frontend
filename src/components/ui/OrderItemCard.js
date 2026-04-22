import React from "react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex items-center justify-between py-1 text-sm text-gray-800">

      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">
          x{item.quantity}
        </span>

        <span>{item.product.name}</span>
      </div>

    </div>
  );
};

export default OrderItemCard;