import React from "react";

export default function TextInput({
  type = "text",
  placeholder = "Enter text...",
  value = "",
  onChange,
  label = "",
  required = false,
}) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label
          htmlFor="input-field"
          className="text-base font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id="input-field"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none focus:border-cyan-500 placeholder-gray-400 text-gray-900 transition duration-200"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
