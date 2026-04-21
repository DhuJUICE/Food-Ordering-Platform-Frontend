import React from "react";
import Button from "./Button";

const ShopSelectionSection = ({ shops, onSelectShop }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {shops.map((shop) => (
        <Button
          key={shop}
          onClick={() => onSelectShop(shop)}
          className="text-lg px-6 py-4 bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
        >
          {shop.charAt(0).toUpperCase() + shop.slice(1)}
        </Button>
      ))}

    </section>
  );
};

export default ShopSelectionSection;