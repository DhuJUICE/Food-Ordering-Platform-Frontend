import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import PageCard from "../../ui/PageCard";
import StatusIcon from "../../ui/StatusIcon";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <PageCard>

        {/* ICON */}
        <StatusIcon type="success" />

        {/* TEXT */}
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-700 mb-6">
          Thank you for your order. Your payment was processed successfully.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            onClick={() => navigate("/menu")}
            className="bg-green-500 hover:bg-green-600"
          >
            Place another order
          </Button>

          <Button
            onClick={() => navigate("/track-orders")}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            View My Orders
          </Button>

        </div>

      </PageCard>

    </main>
  );
};

export default PaymentSuccess;