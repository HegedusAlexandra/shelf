import React from "react";

export default function Button({
  type = "button",
  label = "Click Me",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 transition duration-200";

  const variantStyles = {
    primary:
      "text-sky hover:bg-[#fafafa] hover:text-white focus:ring-sky-700 bg-[#fafafa] my-[2px] font-opensans uppercase",
    yellow:
      "bg-[#fff] text-gray-700 hover:bg-orange-400 hover:text-white focus:ring-black ring-[2px] ring-[#fccb62] hover:ring-0 hover:font-bold",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const disabledStyles =
    "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-orange-300";

  return (
    <button
      type={type}
      className={`w-full ${baseStyles} ${
        disabled ? disabledStyles : variantStyles[variant]
      } ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
