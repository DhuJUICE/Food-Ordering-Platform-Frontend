// api-cart.js
import { API_URL } from "./api-base-url";

/**
 * Fetch all cart items from the backend.
 * Uses session-based cart, no token required.
 */
export const fetchCartItems = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ⚡ ensures session cookie is sent
    });

    if (!response.ok) {
      console.warn("Failed to fetch cart.");
      return [];
    }

    const result = await response.json();
    if (!result.success || !result.cart) return [];

    const cartItems = result.cart;

    // Map backend items to frontend-friendly format
    return Object.values(cartItems).map(item => ({
      id: item.id,
      name: item.prodName,
      prodPrice: item.prodPrice || 0,
      image: item.prodImagePath || "default-image.jpg",
      quantity: item.quantity || 1,
    }));

  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

/**
 * Unified function to update the cart.
 * Handles add, remove, increment, decrement, clear.
 */
export const updateCartAPI = async ({ action, product, quantity }) => {
  try {
    const body = { action, productId: String(product.id) };

    if (action === "add") {
      body.quantity = quantity || 1;
      body.prodName = product.prodName;
      body.prodPrice = product.prodPrice;
      body.prodImagePath = product.prodImagePath;
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const result = await response.json();
    return response.ok
      ? result
      : { success: false, message: result.message || "Cart update failed" };

  } catch (error) {
    console.error("Cart update error:", error);
    return { success: false, message: "An error occurred while updating cart" };
  }
};

/** ================== Usage Helpers ================== */

/** Add product to cart */
export const addToCart = async (product, quantity) => {
  return updateCartAPI({ action: "add", product, quantity });
};

/** Increment product quantity in cart */
export const incrementCartItemAPI = async (product) => {
  return updateCartAPI({ action: "increment", product });
};

/** Decrement product quantity in cart */
export const decrementCartItemAPI = async (product) => {
  return updateCartAPI({ action: "decrement", product });
};

/** Remove product from cart */
export const removeItemFromCartAPI = async (product) => {
  return updateCartAPI({ action: "remove", product });
};

/** Clear all items from cart */
export const clearCartAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "clear", productId: "0" }), // dummy productId
      credentials: "include",
    });

    const result = await response.json();
    return response.ok
      ? result
      : { success: false, message: result.message || "Failed to clear cart" };
  } catch (error) {
    console.error("Clear cart error:", error);
    return { success: false, message: "An error occurred while clearing cart" };
  }
};