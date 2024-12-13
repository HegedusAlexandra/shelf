import React, { useState, useEffect } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { TagType } from "../../utils/Enum";

export default function DropFilter({
  onChange,
  value,
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    onChange(() => option)
    setIsOpen(false);
  };
  
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
    <div className="dropdown-container flex flex-col mb-1 pr-4 xl:w-[12vw] w-full xl:mt-[0vh] mt-[2vh] pl-2 relative">
      <div>
        <button
          className={`${
            value ? "text-black" : "text-gray-400"
          } w-full text-left px-2 py-1`}
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
          {value || placeholder}
        </button>
        <hr className="w-[100%] mx-auto h-[0.5px] bg-stone-300" />
      </div>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-[calc(100%+5px)] z-10 mt-1 w-full min-w-[160px] bg-stone-200 shadow-lg rounded-md max-h-40 overflow-y-auto"
          role="listbox"
        >
          {Object.keys(TagType).map((option, index) => (
            <li
              key={option.id || index} // Use a unique ID if available
              className={`px-4 py-2 cursor-pointer hover:bg-green-300 ${
                value === option ? "bg-transparent font-bold" : ""
              }`}
              role="option"
              aria-selected={value === option}
              tabIndex={0} // Allow keyboard navigation
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
