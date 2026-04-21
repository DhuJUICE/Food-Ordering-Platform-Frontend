import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemCard from "./OrderItemCard";
import { FaClock, FaCreditCard } from "react-icons/fa";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">
          Order #{order.order_number}
        </h2>

        <div className="flex gap-2">
          <OrderStatusBadge status={order.status} />

          {order.is_collected && (
            <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs">
              Collected
            </span>
          )}
        </div>
      </div>

      {/* META */}
      <div className="flex gap-6 text-sm text-gray-600 mb-4">

        <div className="flex items-center gap-1">
          <FaCreditCard />
          {order.payment_method}
        </div>

        {order.created_at && (
          <div className="flex items-center gap-1">
            <FaClock />
            {new Date(order.created_at).toLocaleString()}
          </div>
        )}

      </div>

      {/* ITEMS */}
      <div className="grid gap-3">

        {order.items.map((item, i) => (
          <OrderItemCard key={i} item={item} />
        ))}

      </div>

      {/* TOTAL */}
      <div className="text-right font-semibold mt-4">
        Total: R{order.total_amount}
      </div>

    </div>
  );
};

export default OrderCard;