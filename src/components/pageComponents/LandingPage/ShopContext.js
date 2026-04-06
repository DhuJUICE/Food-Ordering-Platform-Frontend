import React, { createContext, useState, useContext, useEffect } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Load initial value from localStorage if it exists
  const [shop, setShopState] = useState(() => {
    return localStorage.getItem("shop") || null;
  });

  const setShop = (value) => {
    setShopState(value);
    localStorage.setItem("shop", value); // persist
  };

  return (
    <ShopContext.Provider value={{ shop, setShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);