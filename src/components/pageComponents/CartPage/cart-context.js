import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

import {
  fetchCartItems,
  addToCart,
  incrementCartItemAPI,
  decrementCartItemAPI,
  removeItemFromCartAPI,
  clearCartAPI,
} from "../../apiComponents/api-cart";

import { useShop } from "../LandingPage/ShopContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { shop } = useShop();

  const [cart, setCartState] = useState([]); // ✅ no localStorage (backend is truth)
  const [loading, setLoading] = useState(false);

  const [loadedShop, setLoadedShop] = useState(null);

  const setCart = (items) => {
    setCartState(items || []);
  };

  // ✅ Load cart from backend (single source of truth)
  const loadCart = useCallback(async (shop) => {
    setLoading(true);
    try {
      const items = await fetchCartItems(shop);
      setCart(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Load cart on app start
  useEffect(() => {
	if (!shop) return;
	if (loadedShop === shop) return;

	loadCart(shop);
	setLoadedShop(shop);
  }, [shop, loadedShop, loadCart]);

  // ================= ACTIONS =================

  // ✅ Add product → then refetch cart
  const addProduct = async (product, quantity = 1) => {
    const result = await addToCart(product, quantity);
    if (result.success) {
      await loadCart(shop); // 🔥 ALWAYS sync with backend
    }
    return result;
  };

  // ✅ Increment quantity
  const incrementItem = async (product) => {
    const result = await incrementCartItemAPI(product);
    if (result.success) {
      await loadCart(shop);
    }
    return result;
  };

  // ✅ Decrement quantity
  const decrementItem = async (product) => {
    const result = await decrementCartItemAPI(product);
    if (result.success) {
      await loadCart(shop);
    }
    return result;
  };

  // ✅ Remove item
  const removeItem = async (product) => {
    const result = await removeItemFromCartAPI(product);
    if (result.success) {
      await loadCart(shop);
    }
    return result;
  };

  // ✅ Clear cart
  const clearCart = async () => {
    const result = await clearCartAPI();
    if (result.success) {
      setCart([]); // or loadCart()
    }
    return result;
  };

  // ================= DERIVED STATE =================

  // ✅ Unique products count (for badge)
  const totalUniqueItems = cart.length;

  // ✅ Total quantity (if you ever need it)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadCart,
        addProduct,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        totalUniqueItems, // 👈 use this in badge
        totalItems,       // 👈 optional (for totals)
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);