import React, { useCallback } from "react";

export default function Searchfield({
  id = "search-input", // Default id for input
  type = "text",
  placeholder = "Enter text...",
  value = "",
  onChange,
  required = false,
  style = "",
}) {
  const notifyChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col flex-1 pr-5 h-[10vh]">
      <input
        id={id}
        className={`px-4 py-0.5 bg-stone-200 rounded-md focus:ring-2 ring-[2px] ring-sky-400 focus:ring-sky-800 focus:outline-none focus:border-sky-500 placeholder-gray-400 text-gray-900 transition duration-200 ${style}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={notifyChange}
        required={required}
      />
    </div>
  );
}
