import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../apiComponents/api-orders";

const STATUS_OPTIONS = ["pending", "preparing", "done", "cancelled"];

const BusinessDashboardPage = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await fetchAllOrders();
    if (data) setOrders(data.orders);
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
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const handleCollected = async (order) => {
    const updated = await updateOrderStatus(order.order_id, order.status, true);
    if (updated) {
      setOrders((prev) => prev.filter((o) => o.order_id !== order.order_id));
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Dashboard</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Collected</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.order_id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">{order.order_id}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.order_id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    >
                      {STATUS_OPTIONS.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">{order.payment_method}</td>

                  <td className="p-3">
                    <ul className="space-y-2">
                      {Object.entries(order.items).map(([prodId, prodObj]) => (
                        <li
                          key={prodId}
                          className="flex items-center gap-2 border-b border-gray-100 pb-1"
                        >
                          <img
                            src={prodObj.prodImagePath || "https://via.placeholder.com/50"}
                            alt={prodObj.prodName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex flex-col text-sm">
                            <span className="font-medium">{prodObj.prodName}</span>
                            <span>
                              x {prodObj.quantity} - R{prodObj.prodPrice}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-3">
                    <button
                      disabled={order.collected}
                      onClick={() => handleCollected(order)}
                      className={`px-3 py-1 rounded-lg text-white transition-colors ${
                        order.collected
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
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