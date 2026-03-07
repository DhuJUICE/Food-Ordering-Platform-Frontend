import { API_URL } from "./api-base-url";

// Helper function to get auth headers
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

// ##############################################################
// ORDER MANAGEMENT - ORDER API CALLS

// Fetch orders for a specific user (Track Order Page)
export const fetchUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${userId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch user orders");

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
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch all orders");

    return await response.json();
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus, collected = false) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: newStatus, collected }),
    });

    if (!response.ok) throw new Error("Failed to update order status");

    return await response.json();
  } catch (error) {
    console.error(`Error updating order #${orderId}:`, error);
    return null;
  }
};