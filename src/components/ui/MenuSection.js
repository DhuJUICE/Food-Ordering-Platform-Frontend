import React from "react";
import ProductCard from "./ProductCard";

const MenuSection = ({
  products,
  loading,
  onAddToCart,
}) => {
  return (
    <section className="container mx-auto">

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading menu...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => onAddToCart(product)}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default MenuSection;