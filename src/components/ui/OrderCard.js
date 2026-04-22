import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemCard from "./OrderItemCard";
import { FaClock, FaCreditCard } from "react-icons/fa";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border space-y-3">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <h2 className="text-lg font-semibold">
          Order #{order.order_number}
        </h2>

        <OrderStatusBadge status={order.status} />

      </div>

      {/* META */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">

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

        {order.is_collected && (
          <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
            Collected
          </span>
        )}

      </div>

      {/* ITEMS (NO INDIVIDUAL CARDS) */}
      <div className="divide-y divide-gray-100">

        {order.items.map((item, i) => (
          <OrderItemCard key={i} item={item} />
        ))}

      </div>

      {/* TOTAL */}
      <div className="text-right font-semibold pt-2 border-t">
        Total: R{order.total_amount}
      </div>

    </div>
  );
};

export default OrderCard;