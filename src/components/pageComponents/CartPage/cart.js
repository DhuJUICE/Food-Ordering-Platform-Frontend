import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart-context";
import CartSection from "../../ui/CartSection";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, incrementItem, decrementItem, removeItem } = useCart();
  const [loadingItems, setLoadingItems] = useState(false);

  const handleIncrement = async (item) => {
    setLoadingItems(true);
    const res = await incrementItem(item);
    if (!res.success) alert(res.message);
    setLoadingItems(false);
  };

  const handleDecrement = async (item) => {
    if (item.quantity <= 1) return;
    setLoadingItems(true);
    const res = await decrementItem(item);
    if (!res.success) alert(res.message);
    setLoadingItems(false);
  };

  const handleRemove = async (item) => {
    setLoadingItems(true);
    const res = await removeItem(item);
    if (!res.success) alert(res.message);
    setLoadingItems(false);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const goToCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    navigate("/checkout");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">

      <CartSection
        cart={cart}
        loading={loadingItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        subtotal={subtotal}
        onCheckout={goToCheckout}
      />

    </main>
  );
};

export default Cart;