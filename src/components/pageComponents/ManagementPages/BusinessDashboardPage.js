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
          o.order_id === orderId ? { ...o, status: newStatus } : o
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
    <div className="p-4 md:p-10 max-w-7xl mx-auto">

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Business Dashboard
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No active orders.</p>
      ) : (
        <div className="space-y-4">

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

        </div>
      )}
    </div>
  );
};

export default BusinessDashboardPage;