import React from "react";

const OrderStatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-500",
    preparing: "bg-blue-500",
    done: "bg-green-500",
  };

  return (
    <span className={`text-white text-xs px-3 py-1 rounded-full ${colors[status] || "bg-gray-500"}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default OrderStatusBadge;