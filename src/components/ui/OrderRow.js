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
    <div className="bg-white shadow-md rounded-lg p-4 md:p-0 md:table-row">

      {/* MOBILE CARD HEADER */}
      <div className="md:hidden flex justify-between items-center mb-3">
        <span className="font-bold text-lg">
          #{order.order_number}
        </span>

        <span className="text-sm font-semibold text-gray-600 capitalize">
          {order.status}
        </span>
      </div>

      {/* DESKTOP ROW WRAPPER */}
      <div className="hidden md:table-row-group">

        <tr className="border-t border-gray-200 hover:bg-gray-50">

          <td className="p-3 font-medium text-lg">
            #{order.order_number}
          </td>

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

          <td className="p-3">{order.payment_method}</td>

          <td className="p-3">
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-bold text-green-600">
                    x{item.quantity}
                  </span>
                  <span>{item.product.name}</span>
                </li>
              ))}
            </ul>
          </td>

          <td className="p-3 font-semibold">
            R{order.total_amount}
          </td>

          <td className="p-3">
            <Button
              onClick={() => onCollected(order)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Collected
            </Button>
          </td>

        </tr>

      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden space-y-3">

        {/* STATUS */}
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

        {/* ITEMS */}
        <div className="border-t pt-3 space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium text-gray-800">
                x{item.quantity} {item.product.name}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL + ACTION */}
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="font-semibold">
            R{order.total_amount}
          </span>

          <Button
            onClick={() => onCollected(order)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Collected
          </Button>
        </div>

      </div>

    </div>
  );
};

export default OrderRow;