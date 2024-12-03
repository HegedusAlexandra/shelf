import React, { useState, useEffect } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
export default function DropTag({
  options = [],
  onChange,
  value,
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(value.tag_type || null); // Current selection
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => setSelectedOption(value.tag_type), [value]);

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
      <div>
        <button
          className={`${
            selectedOption ? "text-black" : "text-gray-400"
          } w-full text-left px-4 py-1`}
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onFocus={(e) => {
            e.target.nextElementSibling.classList.remove("bg-stone-300");
            e.target.nextElementSibling.classList.add("bg-black");
          }}
          onBlur={(e) => {
            e.target.nextElementSibling.classList.remove("bg-black");
            e.target.nextElementSibling.classList.add("bg-stone-300");
          }}
        >
          {selectedOption?.toLowerCase() || placeholder}
        </button>
        <hr className="w-[100%] mx-auto h-[0.5px] bg-stone-300" />
      </div>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-[calc(100%+5px)] z-10 mt-1 w-full min-w-[200px] bg-stone-200 shadow-lg rounded-md max-h-40 overflow-y-auto"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={option.id || index} // Use a unique ID if available
                className={`px-4 py-2 cursor-pointer hover:bg-lime-300 ${
                  selectedOption === option ? "bg-transparent font-bold" : ""
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
