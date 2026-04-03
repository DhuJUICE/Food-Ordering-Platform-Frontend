import React, { useEffect, useState, useRef } from "react";
import { fetchUserOrders } from "../../apiComponents/api-orders";
import { FaClock, FaCreditCard } from "react-icons/fa";

const TrackOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const firstLoad = useRef(true);

  const loadOrders = async () => {
    try {
      const data = await fetchUserOrders();

      if (data && data.orders) {
        setOrders(data.orders);
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
    loadOrders();
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading orders...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        <center>Track Your Orders</center>
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have no active orders to track.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-xl font-semibold mb-2 md:mb-0">
                  Order #{order.order_id}
                </h2>

                <div className="flex gap-2 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "preparing"
                        ? "bg-blue-500"
                        : order.status === "done"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>

                  {order.collected && (
                    <span className="px-2 py-1 text-sm font-medium bg-gray-300 text-gray-700 rounded-full">
                      Collected
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-10 mb-4 text-gray-700 text-sm">
                <div className="flex items-center gap-1">
                  <FaCreditCard className="text-gray-500" />
                  <span>{order.payment_method}</span>
                </div>

                {order.created_at && (
                  <div className="flex items-center gap-1">
                    <FaClock className="text-gray-500" />
                    <span>
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-semibold mb-3 text-gray-800">Items:</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(order.items).map(([prodId, prodObj]) => (
                  <div
                    key={prodId}
                    className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={
                        prodObj.prodImagePath ||
                        "https://via.placeholder.com/50"
                      }
                      alt={prodObj.prodName}
                      className="w-14 h-14 object-cover rounded"
                    />

                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-gray-800">
                        {prodObj.prodName}
                      </span>
                      <span>
                        x {prodObj.quantity} - R{prodObj.prodPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;