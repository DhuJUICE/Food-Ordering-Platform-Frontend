import { API_URL } from "./api-base-url";

// ##############################################################
// ORDER MANAGEMENT - ORDER API CALLS

// Fetch orders for a specific user (Track Order Page)
export const fetchUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/orders/${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to fetch user orders');

    return await response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return null;
  }
};


// Fetch all orders (Business Dashboard)
export const fetchAllOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders/all`, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to fetch all orders');

    return await response.json();
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return null;
  }
};