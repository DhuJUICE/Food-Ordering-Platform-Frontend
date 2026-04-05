import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../apiComponents/api-orders";

const STATUS_OPTIONS = ["pending", "preparing", "done", "cancelled"];

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
      // remove from UI since backend filters collected=false
      setOrders((prev) =>
        prev.filter((o) => o.order_id !== order.order_id)
      );
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
                  <td className="p-3 font-medium">
                    #{order.order_number}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.order_id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    >
                      {STATUS_OPTIONS.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption.charAt(0).toUpperCase() +
                            statusOption.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* PAYMENT */}
                  <td className="p-3">{order.payment_method}</td>

                  {/* ITEMS */}
                  <td className="p-3">
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 border-b border-gray-100 pb-1"
                        >
                          <img
                            src={
                              item.product.image ||
                              "https://via.placeholder.com/50"
                            }
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />

                          <div className="flex flex-col text-sm">
                            <span className="font-medium">
                              {item.product.name}
                            </span>
                            <span>
                              x {item.quantity} - R
                              {item.price_at_purchase}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* TOTAL */}
                  <td className="p-3 font-semibold">
                    R{order.total_amount}
                  </td>

                  {/* COLLECTED BUTTON */}
                  <td className="p-3">
                    <button
                      onClick={() => handleCollected(order)}
                      className="px-3 py-1 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors"
                    >
                      Mark Collected
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