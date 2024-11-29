import React, { useState } from "react";

export default function Drop({
  options = [],
  label,
  onSelect,
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(null); // Current selection

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
    if (onSelect) {
      onSelect(option); // Notify parent of the selection
    }
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="flex flex-col mb-1 pr-4 w-[100%]">
      {label && (
        <label
          htmlFor="input-field"
          className="text-xs font-medium text-gray-700 mb-2"
        >
          <span>{label}</span>
        </label>
      )}
      <button
        className="w-[100%] bg-stone-100 text-left px-4 py-0.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.name : placeholder}
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-[30vw] bg-white shadow-lg rounded-md max-h-40 overflow-y-auto border border-gray-300"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-white ${
                  selectedOption?.name === option.name
                    ? "bg-sky-200 font-bold"
                    : ""
                }`}
                role="option"
                aria-selected={selectedOption?.name === option.name}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
}
