import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../apiComponents/api-orders";

const BusinessDashboardPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchAllOrders();
      if (data) {
        setOrders(data.orders);
      }
    };

    loadOrders();

    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

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
                <td>{order.status}</td>
                <td>{order.payment_method}</td>
                <td>
					<ul>
					{Object.entries(order.items).map(([prodId, prodObj]) => (
						<li key={prodId}>
						<img src={prodObj.prodImagePath} alt={prodObj.prodName} width="50" />
						{prodObj.prodName} x {prodObj.quantity} - R{prodObj.prodPrice}
						</li>
					))}
					</ul>
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