import React, { useCallback } from "react";

export default function Searchfield({
  id = "search-input", // Default id for input
  type = "text",
  placeholder = "Enter text...",
  value = "",
  onChange,
  required = false,
  style = ""
}) {
  const notifyChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col flex-1 h-[8vh] xl:-translate-x-[2%] -translate-x-[1%]">
      <input
        id={id}
        className={`px-4 py-0.5 rounded-md focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400 text-gray-900 transition duration-200 ${style}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={notifyChange}
        required={required}
      />
      <hr className="xl:w-[96%] w-[98%] mx-auto h-[2px] bg-black" />
    </div>
  );
}
