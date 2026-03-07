import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../apiComponents/api-orders";

const STATUS_OPTIONS = ["pending", "preparing", "done", "cancelled"];

const BusinessDashboardPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const loadOrders = async () => {
    const data = await fetchAllOrders();
    if (data) setOrders(data.orders);
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // Handle status change from dropdown
  const handleStatusChange = async (orderId, newStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
      // Optimistically update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  return (
    <div>
      <h1>Business Dashboard - All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Items</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>

                {/* Status dropdown */}
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{order.payment_method}</td>

                <td>
                  <ul>
                    {Object.entries(order.items).map(([prodId, prodObj]) => (
                      <li key={prodId}>
                        <img src={prodObj.prodImagePath} alt={prodObj.prodName} width="50" />{" "}
                        {prodObj.prodName} x {prodObj.quantity} - R{prodObj.prodPrice}
                      </li>
                    ))}
                  </ul>
                </td>
				<td>

				<button
					disabled={order.collected}
					onClick={async () => {
					const updated = await updateOrderStatus(order.order_id, order.status, true); // pass collected = true
					if (updated) {
						setOrders(prev => prev.filter(o => o.order_id !== order.order_id)); // remove from UI
					}
					}}
				>
					Collected
				</button>
				</td>
				
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusinessDashboardPage;