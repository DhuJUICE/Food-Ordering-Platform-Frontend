import React from "react";
import Button from "./Button";

const CheckoutModal = ({
  open,
  onClose,
  onSubmit,
  phone,
  setPhone,
  name,
  setName,
  phoneError,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
          Customer Details
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className={`w-full border p-3 rounded ${phoneError ? "border-red-500" : ""}`}
          />

          {phoneError && (
            <p className="text-red-500 text-sm">{phoneError}</p>
          )}

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-between">

            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">
              Continue
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;