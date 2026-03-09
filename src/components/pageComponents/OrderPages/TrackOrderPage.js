import React, { useEffect, useState, useRef } from "react";
import { fetchUserOrders } from "../../apiComponents/api-orders";

const TrackOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const phone = localStorage.getItem("customerPhone"); // ⚡ stored during checkout

  // useRef to avoid blinking while polling
  const firstLoad = useRef(true);

  const loadOrders = async () => {
    if (!phone) {
      setError("No phone number found. Cannot track orders.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchUserOrders(phone);
      if (data && data.orders) {
        // Only update state if there’s a change
        const isDifferent =
          JSON.stringify(data.orders) !== JSON.stringify(orders);
        if (isDifferent) setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      if (firstLoad.current) {
        setLoading(false);
        firstLoad.current = false;
      }
    }
  };

  useEffect(() => {
    // Initial load
    loadOrders();

    // Poll every 5 seconds in background
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, [phone]); // only re-run if phone changes

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Track Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            style={{
              border: "1px solid black",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>Order #{order.order_id}</h2>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {order.status.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Payment Method:</strong> {order.payment_method}
            </p>
            <h3>Items:</h3>
            <ul>
              {Object.entries(order.items).map(([prodId, prodObj]) => (
                <li
                  key={prodId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <img
                    src={prodObj.prodImagePath}
                    alt={prodObj.prodName}
                    width="50"
                    height="50"
                    style={{ marginRight: "10px" }}
                  />
                  <span>
                    {prodObj.prodName} x {prodObj.quantity} - R{prodObj.prodPrice}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TrackOrderPage;