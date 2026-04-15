import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../apiComponents/api-orders";

const STATUS_OPTIONS = ["waiting", "preparing", "done"];

const BusinessDashboardPage = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await fetchAllOrders();
    if (data && data.order_items) {
      setOrders(data.order_items);
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    }
  };

  const handleCollected = async (order) => {
    const updated = await updateOrderStatus(
      order.order_id,
      order.status,
      true
    );

    if (updated) {
      setOrders((prev) =>
        prev.filter((o) => o.order_id !== order.order_id)
      );
    }
  };

  const getNextStatus = (current) => {
    const index = STATUS_OPTIONS.indexOf(current);
    if (index < STATUS_OPTIONS.length - 1) {
      return STATUS_OPTIONS[index + 1];
    }
    return current;
  };

  const getPrevStatus = (current) => {
    const index = STATUS_OPTIONS.indexOf(current);
    if (index > 0) {
      return STATUS_OPTIONS[index - 1];
    }
    return current;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "preparing":
        return "bg-blue-500 hover:bg-blue-600";
      case "done":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Business Dashboard
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No active orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Order #</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Collected</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.order_id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  {/* ORDER NUMBER */}
                  <td className="p-3 font-medium text-lg">
                    #{order.order_number}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleStatusChange(
                            order.order_id,
                            getPrevStatus(order.status)
                          )
                        }
                        disabled={order.status === "waiting"}
                        className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                      >
                        Back
                      </button>

                      <span className="font-bold capitalize text-lg">
                        {order.status}
                      </span>

                      <button
                        onClick={() =>
                          handleStatusChange(
                            order.order_id,
                            getNextStatus(order.status)
                          )
                        }
                        disabled={order.status === "done"}
                        className={`px-4 py-1 rounded-lg text-white transition-colors ${getStatusColor(order.status)} disabled:opacity-50`}
                      >
                        Next
                      </button>

                    </div>
                  </td>

                  {/* PAYMENT */}
                  <td className="p-3">{order.payment_method}</td>

                  {/* ✅ CLEAN ITEMS DISPLAY */}
                  <td className="p-3">
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4 border-b border-gray-200 pb-2"
                        >
                          {/* BIG QUANTITY */}
                          <span className="text-2xl font-extrabold text-green-600 min-w-[40px]">
                            x{item.quantity}
                          </span>

                          {/* PRODUCT NAME */}
                          <span className="text-lg font-semibold text-gray-800">
                            {item.product.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* TOTAL */}
                  <td className="p-3 font-semibold">
                    R{order.total_amount}
                  </td>

                  {/* COLLECTED */}
                  <td className="p-3">
                    <button
                      onClick={() => handleCollected(order)}
                      className="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors font-semibold"
                    >
                      Collected
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboardPage;