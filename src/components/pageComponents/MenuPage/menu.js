import React from "react";
import { useCart } from "../CartPage/cart-context";
import { useProducts } from "./product-context";
import { useShop } from "../LandingPage/ShopContext";
import ProductCard from "../../ui/ProductCard";

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading menu...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No products available.</p>
        </div>
      ) : (
        <div className="container mx-auto flex flex-wrap justify-center gap-6">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => handleAddToCart(product)}
            />
          ))}

        </div>
      )}

    </main>
  );
};

export default MenuPage;