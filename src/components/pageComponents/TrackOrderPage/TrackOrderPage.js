import React, { useEffect, useState, useRef } from "react";
import { fetchUserOrders } from "../../apiComponents/api-orders";
import { useShop } from "../LandingPage/ShopContext";

import OrderCard from "../../ui/OrderCard";

const TrackOrderPage = () => {
  const { shop } = useShop();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const firstLoad = useRef(true);

  const loadOrders = async () => {
    if (!shop) return;

    try {
      const data = await fetchUserOrders(shop);
      setOrders(data?.order_items || []);
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      if (firstLoad.current) {
        setLoading(false);
        firstLoad.current = false;
      }
    }
  };

  useEffect(() => {
    if (!shop) return;

    loadOrders();
    const interval = setInterval(loadOrders, 10000);

    return () => clearInterval(interval);
  }, [shop]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Track Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">
          No active orders.
        </p>
      ) : (
        <div className="flex flex-col gap-6">

          {orders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))}

        </div>
      )}

    </div>
  );
};

export default TrackOrderPage;