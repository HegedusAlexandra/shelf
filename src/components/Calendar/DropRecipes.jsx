import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

export default function DropRecipes({
  options = [],
  onChange,
  value = {},
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value.recipeId || null);
  const [selectedPortion, setSelectedPortion] = useState(value.portions || 0);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    if (
      value.recipeId !== selectedOption ||
      value.portions !== selectedPortion
    ) {
      setSelectedOption(value.recipeId || null);
      setSelectedPortion(value.portions || 0);
    }
  }, [value.recipeId, value.portions, selectedOption, selectedPortion]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        selectedOption !== value.recipeId ||
        selectedPortion !== value.portions
      ) {
        onChange({
          recipeId: selectedOption,
          portions: selectedPortion,
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or dependencies change
  }, [selectedOption, selectedPortion, value.recipeId, value.portions, onChange]);

  const handleOptionClick = (option) => {
    if (selectedOption !== option.id) {
      setSelectedOption(option.id);
      setIsOpen(false);
    }
  };

  const handlePortionChange = (e) => {
    const newValue = e.target.value;
    setSelectedPortion(newValue === "" ? 0 : parseFloat(newValue));
  };

  return (
    <div
      className="relative flex flex-row items-center gap-[1vw] mb-[4vh]"
    >
      <div className="flex flex-col w-[100%] gap-[1vw] h-[4vh]">
        <div className="flex-1">
          <button
            className={`${
              selectedOption ? "text-black" : "text-gray-400"
            } w-[100%] h-[100%] text-left px-4 focus:outline-none`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {selectedOption
              ? options.find((option) => option.id === selectedOption)?.name ||
                placeholder
              : placeholder}
          </button>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <div>
          <div className="w-[100%] flex flex-row justify-between">
            <input
              type="number"
              placeholder="0"
              className="px-4 w-[80px]"
              value={selectedPortion || ""}
              onChange={handlePortionChange}
            />
            <p>adag</p>
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
      </div>
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
                  selectedOption === option.id ? "bg-stone-200 font-bold" : ""
                }`}
                role="option"
                aria-selected={selectedOption === option.id}
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

DropRecipes.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    portions: PropTypes.number,
  }),
};
