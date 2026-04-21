import React, { useState } from "react";
import { useCart } from "../CartPage/cart-context";
import { useShop } from "../LandingPage/ShopContext";
import { processPayment } from "../../apiComponents/api-checkout";

import CheckoutSummary from "../../ui/CheckoutSummary";
import CheckoutModal from "../../ui/CheckoutModal";
import Button from "../../ui/Button";

const Checkout = () => {
  const { cart } = useCart();
  const { shop } = useShop();

  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const totalPrice = subtotal;

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPhoneError("");

    let phone = customerPhone.trim().replace(/\s|-/g, "");

    if (phone.startsWith("0")) {
      if (phone.length !== 10) {
        setPhoneError("Invalid SA number format");
        return;
      }
      phone = "+27" + phone.slice(1);
    } else {
      if (phone.length !== 9) {
        setPhoneError("Invalid SA number format");
        return;
      }
      phone = "+27" + phone;
    }

    await processPayment(shop, totalPrice, customerName, phone);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">

      <div className="w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
          Confirm Order
        </h1>

        <CheckoutSummary cart={cart} subtotal={subtotal} total={totalPrice} />

        <form onSubmit={handleOpenModal} className="text-center mt-6">
          <Button type="submit" className="px-10 py-3 text-lg">
            Pay Order
          </Button>
        </form>

      </div>

      <CheckoutModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        phone={customerPhone}
        setPhone={setCustomerPhone}
        name={customerName}
        setName={setCustomerName}
        phoneError={phoneError}
      />

    </main>
  );
};

export default Checkout;