import React, { useState, useEffect } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

export default function DropIngredient({
  options = [],
  onChange,
  value = { id: null, amount: null, name: null, measurement: null },
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value); // Manage local state
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  useEffect(() => {
    // Update local state when value prop changes
    if (
      value.id !== localValue.id ||
      value.amount !== localValue.amount ||
      value.name !== localValue.name
    ) {
      setLocalValue(value);
    }
  }, [value]);

  const handleOptionClick = (option) => {
    const updatedValue = { ...localValue, id: option.id, name: option.name };
    setLocalValue(updatedValue);
    setIsOpen(false);
    if (onChange) {
      onChange(updatedValue);
    }
  };

  const handleAmountChange = (amount) => {
    const updatedValue = { ...localValue, amount: parseFloat(amount) };
    setLocalValue(updatedValue);
    if (onChange) {
      onChange(updatedValue);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(localValue.name?.toLowerCase() || "")
  );

  return (
    <div className="relative flex flex-col items-start gap-2 flex-1">
      <div className="flex flex-row items-center w-full gap-[2vh]">
        <div className="flex-1">
          <input
            type="text"
            placeholder={placeholder}
            className="w-[100%] text-left px-4 py-0.5"
            value={localValue.name || ""}
            onClick={() => setIsOpen(true)}
            onChange={(e) => {
              const updatedValue = { ...localValue, name: e.target.value };
              setLocalValue(updatedValue);
              setIsOpen(true); // Reopen dropdown while typing
            }}
            onFocus={(e) => {
              e.target.nextElementSibling.classList.remove("bg-stone-300");
              e.target.nextElementSibling.classList.add("bg-black");
            }}
            onBlur={(e) => {
              e.target.nextElementSibling.classList.remove("bg-black");
              e.target.nextElementSibling.classList.add("bg-stone-300");
            }}
          />
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <div>
          <input
            type="number"
            placeholder="0"
            className="px-3 py-0.5 w-[80px]"
            value={localValue.amount || ""}
            onChange={(e) => handleAmountChange(e.target.value)}
            onFocus={(e) => {
              e.target.nextElementSibling.classList.remove("bg-stone-300");
              e.target.nextElementSibling.classList.add("bg-black");
            }}
            onBlur={(e) => {
              e.target.nextElementSibling.classList.remove("bg-black");
              e.target.nextElementSibling.classList.add("bg-stone-300");
            }}
          />
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <p className="pr-[2vh]">
          {!localValue
            ? " "
            : filteredOptions?.find((el) => el.id === localValue.id)
                ?.measurement}
        </p>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-[calc(100%+5px)] left-0 w-full bg-stone-200 shadow-lg rounded-md border border-gray-300 z-10"
        >
          <ul className="max-h-[30vh] overflow-y-auto" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.id || index} // Ensure unique keys
                  className={`px-4 py-2 cursor-pointer hover:bg-green-300 ${
                    localValue.id === option.id ? "bg-transparent font-bold" : ""
                  }`}
                  role="option"
                  aria-selected={localValue.id === option.id}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
