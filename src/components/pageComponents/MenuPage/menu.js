import React from "react";
import { useCart } from "../CartPage/cart-context";
import { useProducts } from "./product-context";

const MenuPage = () => {
  const { addProduct } = useCart(); // ✅ ONLY use context action
  const { products, loading } = useProducts();

  const handleAddToCart = async (product) => {
    const result = await addProduct(product, 1);

    if (!result.success) {
      alert(result.message || "Failed to add item.");
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">
            No products available at the moment.
          </p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all flex flex-col justify-between w-60 h-80 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                <div className="flex flex-col items-center mb-4">
                  <p className="text-lg font-semibold text-gray-800 text-center">
                    {product.name}
                  </p>
                  <p className="text-green-600 font-bold text-md mt-1">
                    R{product.price}
                  </p>
                </div>

                <button
                  className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuPage;