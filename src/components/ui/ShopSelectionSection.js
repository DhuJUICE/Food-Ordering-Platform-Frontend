import React from "react";
import Button from "./Button";

const ShopSelectionSection = ({ shops, onSelectShop }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {shops.map((shop) => (
        <Button
          key={shop}
          onClick={() => onSelectShop(shop)}
          variant="default"
          className="text-lg px-6 py-4"
        >
          {shop.charAt(0).toUpperCase() + shop.slice(1)}
        </Button>
      ))}

    </section>
  );
};

export default ShopSelectionSection;