import React from "react";

export default function TextInput({
  type = "text",
  placeholder = "Enter text...",
  value = { order: null, description: "" },
  index,
  onChange,
  required = false,
  style = "",
}) {


  const notifyChange = (e) => {
    onChange({ order: index, description: e.target.value });
  };

  return (
    <div className="flex flex-col mb-2 flex-1 pr-5">
      <input
        id="input-field"
        className={`px-4 py-0.5 placeholder-gray-400 text-gray-900 transition duration-200 ${style}`}
        type={type}
        placeholder={placeholder}
        value={value.description || ""}
        onChange={notifyChange}
        required={required}
        onFocus={(e) => {
          e.target.nextElementSibling.classList.remove("bg-stone-300");
          e.target.nextElementSibling.classList.add("bg-black");
        }}
        onBlur={(e) => {
          e.target.nextElementSibling.classList.remove("bg-black");
          e.target.nextElementSibling.classList.add("bg-stone-300");
        }}
      />
      <hr className="w-[100%] mx-auto h-[0.5px] bg-stone-300" />
    </div>
  );
}
