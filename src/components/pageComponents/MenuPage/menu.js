import React from "react";
import { useCart } from "../CartPage/cart-context";
import { useProducts } from "./product-context";
import { useShop } from "../LandingPage/ShopContext";
import MenuSection from "../../ui/MenuSection";

const MenuPage = () => {
  const { addProduct } = useCart();
  const { products, loading } = useProducts();
  const { shop } = useShop();

  const handleAddToCart = async (product) => {
    if (!shop) {
      alert("Please select a shop first.");
      return;
    }

    const result = await addProduct(shop, product, 1);

    if (!result.success) {
      alert(result.message || "Failed to add item.");
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">

      <MenuSection
        products={products}
        loading={loading}
        onAddToCart={handleAddToCart}
      />

    </main>
  );
};

export default MenuPage;