import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label className="text-sm text-gray-600">
          {label}
        </label>
      )}

      <input
        {...props}
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default Input;