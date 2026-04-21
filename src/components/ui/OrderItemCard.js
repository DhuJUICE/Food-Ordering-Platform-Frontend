import React from "react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex justify-between items-center border p-3 rounded-lg">

      <div className="text-sm font-medium text-gray-800">
        x{item.quantity} {item.product.name}
      </div>

    </div>
  );
};

export default OrderItemCard;