import React from "react";

const IconButton = ({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const base =
    "flex items-center justify-center rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed p-1";

  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "w-9 h-9 text-sm",   // ⬅️ increased touch area
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;