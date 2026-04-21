import React, { useEffect, useState } from "react";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../apiComponents/api-orders";
import OrderRow from "../../ui/OrderRow";

const STATUS_OPTIONS = ["waiting", "preparing", "done"];

const BusinessDashboardPage = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await fetchAllOrders();
    setOrders(data?.order_items || []);
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);

    if (updated) {
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId
            ? { ...o, status: newStatus }
            : o
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
    const i = STATUS_OPTIONS.indexOf(current);
    return STATUS_OPTIONS[i + 1] || current;
  };

  const getPrevStatus = (current) => {
    const i = STATUS_OPTIONS.indexOf(current);
    return STATUS_OPTIONS[i - 1] || current;
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
                <OrderRow
                  key={order.order_id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onCollected={handleCollected}
                  getNextStatus={getNextStatus}
                  getPrevStatus={getPrevStatus}
                  getStatusColor={getStatusColor}
                />
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default BusinessDashboardPage;