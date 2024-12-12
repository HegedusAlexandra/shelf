import React, { useState } from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

export default function DropRecipes({
  options = [],
  onChangeInput,
  onChangeDropdown,
  value = {},
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
console.log(value.recipeId,options);

  return (
    <div className="relative flex flex-row items-center gap-[1vw] mb-[4vh]">
      <div className="flex flex-col w-[100%] gap-[1vw] h-[4vh]">
        {/* Dropdown button */}
        <div className="flex-1">
          <button
            className={`${
              value.recipeId ? "text-black" : "text-gray-400"
            } w-[100%] h-[100%] text-left px-4 focus:outline-none`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {value.recipeId
              ? options.find((option) => option.id === value.recipeId)?.name ||
                placeholder
              : placeholder}
          </button>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>

        {/* Portion input */}
        <div>
          <div className="w-[100%] flex flex-row justify-between">
            <input
              type="number"
              placeholder="0"
              className="px-4 w-[80px]"
              value={value.portions || ""}
              onChange={(e) => onChangeInput(parseInt(e.target.value, 10) || 0)}
            />
            <p>adag</p>
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-1 top-[calc(100%)] w-[100%] text-gray-600 bg-stone-200 shadow-lg rounded-md max-h-40 overflow-y-auto"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-green-300 ${
                  value.recipeId === option.id ? "bg-stone-200 font-bold" : ""
                }`}
                role="option"
                aria-selected={value.recipeId === option.id}
                onClick={() => {
                  onChangeDropdown(option.id);
                  setIsOpen(false); // Close the dropdown after selection
                }}
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

DropRecipes.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onChangeInput: PropTypes.func.isRequired,
  onChangeDropdown: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    portions: PropTypes.number,
  }),
};
