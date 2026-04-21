import React from "react";
import Button from "./Button";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition flex flex-col w-60 h-80 p-4">

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      {/* Info */}
      <div className="flex flex-col items-center flex-1">
        <p className="text-md font-semibold text-gray-800 text-center">
          {product.name}
        </p>

        <p className="text-green-600 font-bold mt-1">
          R{product.price}
        </p>
      </div>

      {/* Action */}
      <Button onClick={onAdd} className="mt-auto w-full">
        Add to Cart
      </Button>

    </div>
  );
};

export default ProductCard;