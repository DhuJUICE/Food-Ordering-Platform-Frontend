import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchCartItems, updateCartAPI } from "../../apiComponents/api-cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const setCart = (items) => {
    setCartState(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const items = await fetchCartItems();
      setCart(Object.values(items || {}));
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (product, quantity = 1) => {
    const result = await updateCartAPI({ action: "add", product, quantity });
    if (result.success) setCart(Object.values(result.cart));
    return result;
  };

  const incrementItem = async (product) => {
    const result = await updateCartAPI({ action: "increment", product });
    if (result.success) setCart(Object.values(result.cart));
    return result;
  };

  const decrementItem = async (product) => {
    const result = await updateCartAPI({ action: "decrement", product });
    if (result.success) setCart(Object.values(result.cart));
    return result;
  };

  const removeItem = async (product) => {
    const result = await updateCartAPI({ action: "remove", product });
    if (result.success) setCart(Object.values(result.cart));
    return result;
  };

  const clearCart = async () => {
    const result = await updateCartAPI({ action: "clear"});
    if (result.success) setCart([]);
    return result;
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadCart,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        totalQuantity,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);