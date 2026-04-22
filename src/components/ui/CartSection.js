import React from "react";
import CartItem from "./CartItem";
import Button from "./Button";

const CartSection = ({
  cart,
  loading,
  onIncrement,
  onDecrement,
  onRemove,
  subtotal,
  onCheckout,
}) => {
  return (
    <section className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">

      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        My Order
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          You have not placed an order yet
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                loading={loading}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* SUMMARY */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg p-4 gap-3 sm:gap-0">

            <p className="text-lg font-semibold text-gray-800">
              Subtotal:{" "}
              <span className="text-green-600">
                R {subtotal.toFixed(2)}
              </span>
            </p>

            <Button onClick={onCheckout}>
              Confirm Order
            </Button>

          </div>
        </>
      )}

    </section>
  );
};

export default CartSection;