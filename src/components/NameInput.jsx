import React from "react";

export default function NameInput({
  type = "text",
  placeholder = "Enter text...",
  onChange,
  required = false,
  style = "",
  value= ""
}) {

  return (
    <div className="flex flex-col mb-2 flex-1">
      <input
        id="input-field"
        className={`px-4 py-0.5 bg-stone-200 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none focus:border-sky-500 placeholder-gray-400 text-gray-900 transition duration-200 ${style}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
