import React from "react";

export default function TextInput({
  type = "text",
  placeholder = "Enter text...",
  value = "",
  onChange,
  label = "",
  required = false,
  style
}) {
  return (
    <div className="flex flex-col mb-2 w-full">
      {label && (
        <label
          htmlFor="input-field"
          className="text-xs font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id="input-field"
        className={`w-full px-4 py-0.5 bg-white rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none focus:border-sky-500 placeholder-gray-400 text-gray-900 transition duration-200 ${style}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
