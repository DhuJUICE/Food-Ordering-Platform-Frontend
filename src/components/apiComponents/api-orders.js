import { API_URL } from "./api-base-url";

// Fetch orders for a specific user (Track Order Page)
export const fetchUserOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders/track`, {
      headers: {"Content-Type": "application/json"},
	    credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to track orders");

    return await response.json();
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return null;
  }
};

// Fetch all orders (Business Dashboard)
export const fetchAllOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders/all`, {
      headers: {"Content-Type": "application/json"},
	    credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch dashboard orders");

    return await response.json();
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus, is_collected = false) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ status: newStatus, is_collected }),
	    credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to update order status");

    return await response.json();
  } catch (error) {
    console.error(`Error updating order #${orderId}:`, error);
    return null;
  }
};