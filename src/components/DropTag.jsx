import React, { useState, useEffect } from "react";

export default function DropTag({
  options = [],
  onChange,
  value,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(value.tag_type || null); // Current selection

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => setSelectedOption(value.tag_type),[value])

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange({ tag_type: option });
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="dropdown-container flex flex-col mb-1 pr-4 w-full relative">
      <button
        className={`${
          selectedOption ? "text-black" : "text-gray-400"
        } w-full bg-stone-200 text-left px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption || placeholder}
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full min-w-[200px] bg-white shadow-lg rounded-md max-h-40 overflow-y-auto border border-gray-300"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={option.id || index} // Use a unique ID if available
                className={`px-4 py-2 cursor-pointer hover:bg-sky-100 ${
                  selectedOption === option ? "bg-sky-200 font-bold" : ""
                }`}
                role="option"
                aria-selected={selectedOption === option}
                tabIndex={0} // Allow keyboard navigation
                onClick={() => handleOptionClick(option)}
              >
                {option}
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
