import React from "react";
import Button from "./Button";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition flex flex-col w-full max-w-[170px] sm:max-w-[240px] overflow-hidden">

      {/* IMAGE */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center px-2 py-3 gap-1">

        <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.name}
        </p>

        <p className="text-green-600 font-bold text-sm">
          R{product.price}
        </p>

      </div>

      {/* BUTTON */}
      <div className="px-2 pb-3">
        <Button onClick={onAdd} className="w-full py-2 text-xs sm:text-sm">
          Add to Cart
        </Button>
      </div>

    </div>
  );
};

export default ProductCard;