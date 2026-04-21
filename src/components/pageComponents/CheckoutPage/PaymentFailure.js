import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartPage/cart-context";
import { clearCartAPI } from "../../apiComponents/api-cart";

import Button from "../../ui/Button";
import PageCard from "../../ui/PageCard";
import StatusIcon from "../../ui/StatusIcon";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { setCart } = useCart();

  const handleCancelOrder = async () => {
    setCart([]);
    navigate("/menu");

    try {
      await clearCartAPI({ action: "clear" });
    } catch (err) {
      console.error("Failed to clear backend cart:", err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <PageCard>

        {/* ICON */}
        <StatusIcon type="error" />

        {/* TEXT */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed or Cancelled
        </h1>

        <p className="text-gray-700 mb-2">
          Your payment was not completed. This could be due to cancellation,
          insufficient funds, or a network issue.
        </p>

        <p className="text-sm text-gray-600 mb-6">
          No charges have been made.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            onClick={() => navigate("/checkout")}
            className="bg-red-500 hover:bg-red-600"
          >
            Try Again
          </Button>

          <Button
            onClick={handleCancelOrder}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel Order
          </Button>

        </div>

      </PageCard>

    </main>
  );
};

export default PaymentFailure;