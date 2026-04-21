import React from "react";

const CheckoutSummary = ({ cart, subtotal, total }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6">

      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between py-3">
            <span>
              x {item.quantity} {item.product_name} 
            </span>
            <span>
              R{(item.product_price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <span>Subtotal</span>
        <span>R{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-green-600 text-xl mt-2">
        <span>Total</span>
        <span>R{total.toFixed(2)}</span>
      </div>

    </div>
  );
};

export default CheckoutSummary;