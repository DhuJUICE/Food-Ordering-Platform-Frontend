import React from "react";

const ButtonUI = ({
  children,
  onClick,
  variant = "default",
  className = "",
  type = "button",
}) => {
  const base =
    "px-4 py-2 text-sm rounded-md transition font-medium flex items-center justify-center gap-2";

  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonUI;