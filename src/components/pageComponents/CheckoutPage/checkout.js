import React, { useState } from "react";
import { useCart } from "../CartPage/cart-context";
import { processPayment } from "../../apiComponents/api-checkout";

const Checkout = () => {
  const { cart } = useCart();


  const [showModal, setShowModal] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [phoneError, setPhoneError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const totalPrice = subtotal;

  const handleOpenModal = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    setShowModal(true);
  };

  const handleSubmitDetails = async (event) => {
    event.preventDefault();

    setPhoneError("");

    if (!customerPhone) {
      setPhoneError("Please enter your phone number");
      return;
    }

    // Trim and clean phone
    let phone = customerPhone.trim().replace(/\s|-/g, "");

    // Normalization & Validation
    if (phone.startsWith("0")) {
      if (phone.length !== 10) {
        setPhoneError("Phone must be 10 digits starting with 0 (e.g. 0821234567)");
        return;
      }
      phone = "+27" + phone.slice(1);
    } else {
      if (phone.length !== 9) {
        setPhoneError("Phone must be 9 digits without the 0");
        return;
      }
      phone = "+27" + phone;
    }

    await processPayment(
      totalPrice,
      customerName,
      phone
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center tracking-wide">
          Confirm Order
        </h1>

        {/* Receipt */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-3">
                <span className="text-gray-800 font-medium">
                  {item.product_name} x {item.quantity}
                </span>
                <span className="text-gray-700">
                  R{(item.product_price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-green-600 text-xl mb-4 border-t border-gray-200 pt-2">
            <span>Total:</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleOpenModal} className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-xl transition-transform transform hover:scale-105 shadow-md"
          >
            Pay Order
          </button>
        </form>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
              Customer Details
            </h2>

            <form onSubmit={handleSubmitDetails} className="space-y-4">

              {/* PHONE */}
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    setPhoneError("");
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    phoneError ? "border-red-500" : ""
                  }`}
                />

                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>

              {/* NAME OPTIONAL */}
              <input
                type="text"
                placeholder="Name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Continue to Payment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;
