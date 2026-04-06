// api-cart.js
import { API_URL } from "./api-base-url";

/**
 * Fetch all cart items from the backend.
 * Uses session-based cart, no token required.
 */
export const fetchCartItems = async (shop) => {
  try {
    const url = shop ? `${API_URL}/${shop}/api/cart` : `${API_URL}/api/cart`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // Always try to parse JSON
    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      // Show backend message even for 404
      const msg = result?.message || result?.error || "Failed to fetch cart.";
      alert(msg); // or handle in UI instead of alert
      return [];
    }

    if (!result.success) {
      const msg = result?.message || result?.error || "Failed to fetch cart.";
      alert(msg);
      return [];
    }

    return result.cartItems.map((item) => ({
      id: item.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_price: item.product.price || 0,
      product_image: item.product.image || "default-image.jpg",
      quantity: item.quantity || 1,
    }));
  } catch (error) {
    console.error("Error fetching cart:", error);
    alert("An unexpected error occurred while fetching the cart.");
    return [];
  }
};


//=========================================================
/** Add product to cart */
export const addToCart = async (product, quantity) => {
  
  try {
    const body = {};

    body.productId = String(product.id);
    body.quantity = quantity || 1;
    body.name = product.name;
    body.price = product.price;
    body.image = product.image;

    const response = await fetch(`${API_URL}/api/cart/${body.productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const result = await response.json();

    return response.ok
      ? result
      : { success: false, message: result.message || "Add to cart failed" };  
  } catch (error) {
    console.error("Cart update error:", error);
    return { success: false, message: "An error occurred while adding to cart" };
  }
};


/** Remove product from cart */
export const removeItemFromCartAPI = async (cart_item) => {
  try {
    const productId = cart_item.product_id;

    const response = await fetch(`${API_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    return response.ok
      ? result
      : { success: false, message: result.message || "Delete cart item failed" };  
  } catch (error) {
    console.error("Cart update error:", error);
    return { success: false, message: "An error occurred while deleting cart item" };
  }
};

/**
 * Unified function to update the cart.
 * Handles increment, decrement, clear.
 */

export const updateCartAPI = async ({ action, cart_item = null}) => {
  try {
    const body = { action };

    if (action === "clear") {
      body.product_id = "0"; // dummy product ID for clearing
    } else if (cart_item) {
      body.product_id = String(cart_item.product_id);
    } else {
      return { success: false, message: "Product required for this action" };
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

/** Increment product quantity in cart */
export const incrementCartItemAPI = async (cart_item) => {
  return updateCartAPI({ action: "increment", cart_item });
};

/** Decrement product quantity in cart */
export const decrementCartItemAPI = async (cart_item) => {
  return updateCartAPI({ action: "decrement", cart_item });
};

/** Clear all items from cart */
export const clearCartAPI = async () => {
  return updateCartAPI({ action: "clear"});
};
