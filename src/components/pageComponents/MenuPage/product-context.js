import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchMenuProducts } from "../../apiComponents/api-products";
import { useShop } from "../LandingPage/ShopContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { shop } = useShop(); // ✅ get current shop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedShop, setLoadedShop] = useState(null); // track which shop's products are loaded

  const setProductList = (items) => {
    setProducts(items || []);
    // Optional: persist to localStorage if needed
    // localStorage.setItem("products", JSON.stringify(items));
  };

  // Load products from API for a specific shop
  const loadProducts = useCallback(async (shop) => {
    if (!shop) return; // don't fetch if no shop selected
    setLoading(true);
    try {
      const data = await fetchMenuProducts(shop); // pass shop to API
      setProductList(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products whenever shop changes
  useEffect(() => {
    if (!shop) return;              // ❌ don't load if no shop selected
    if (loadedShop === shop) return; // ✅ already loaded for this shop

    loadProducts(shop);
    setLoadedShop(shop);             // track which shop is loaded
  }, [shop, loadedShop, loadProducts]);

  return (
    <ProductContext.Provider value={{ products, setProductList, loadProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook for easy use
export const useProducts = () => useContext(ProductContext);