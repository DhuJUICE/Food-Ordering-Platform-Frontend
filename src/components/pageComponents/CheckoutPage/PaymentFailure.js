import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartPage/cart-context"; // your CartContext
import { clearCartAPI } from "../../apiComponents/api-cart"; // backend helper

const PaymentFailure = ({ orderNumber, total }) => {
  const navigate = useNavigate();
  const { setCart } = useCart(); // context setter for immediate UI update

  // Function to handle cancel order
  const handleCancelOrder = async () => {
    // Clear cart immediately in context (updates header badge & cart page)
    setCart([]);

    // Redirect user immediately to menu/home
    navigate("/menu");

    // Clear backend cart in background
    try {
      await clearCartAPI({action: "clear"});
    } catch (err) {
      console.error("Failed to clear backend cart:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 md:p-16 w-full max-w-xl text-center">
        {/* Failure Icon */}
        <div className="mx-auto mb-6 w-24 h-24 flex items-center justify-center bg-red-100 rounded-full">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Failure Text */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Unsuccessful</h1>
        <p className="text-gray-700 mb-6">Unfortunately, your payment could not be processed.</p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={handleCancelOrder} // ✅ clear cart & redirect
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailure;