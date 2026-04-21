import React from "react";
import OrderStatusControls from "./OrderStatusControls";
import Button from "./Button";

const OrderRow = ({
  order,
  onStatusChange,
  onCollected,
  getNextStatus,
  getPrevStatus,
  getStatusColor,
}) => {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">

      {/* Order number */}
      <td className="p-3 font-medium text-lg">
        #{order.order_number}
      </td>

      {/* Status */}
      <td className="p-3">
        <OrderStatusControls
          status={order.status}
          onBack={() =>
            onStatusChange(order.order_id, getPrevStatus(order.status))
          }
          onNext={() =>
            onStatusChange(order.order_id, getNextStatus(order.status))
          }
          disabledBack={order.status === "waiting"}
          disabledNext={order.status === "done"}
          getStatusColor={getStatusColor}
        />
      </td>

      {/* Payment */}
      <td className="p-3">
        {order.payment_method}
      </td>

      {/* Items */}
      <td className="p-3">
        <ul className="space-y-3">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 border-b border-gray-200 pb-2"
            >
              <span className="text-2xl font-extrabold text-green-600 min-w-[40px]">
                x{item.quantity}
              </span>

              <span className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </span>
            </li>
          ))}
        </ul>
      </td>

      {/* Total */}
      <td className="p-3 font-semibold">
        R{order.total_amount}
      </td>

      {/* Collected */}
      <td className="p-3">
        <Button
          onClick={() => onCollected(order)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Collected
        </Button>
      </td>

    </tr>
  );
};

export default OrderRow;