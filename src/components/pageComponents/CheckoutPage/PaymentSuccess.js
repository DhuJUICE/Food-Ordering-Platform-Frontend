import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ orderNumber, total }) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 md:p-16 w-full max-w-xl text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 w-24 h-24 flex items-center justify-center bg-green-100 rounded-full">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Confirmation Text */}
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your order. Your payment was processed successfully.</p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Place another order
          </button>
          <button
            onClick={() => navigate("/track-orders")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View My Orders
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
