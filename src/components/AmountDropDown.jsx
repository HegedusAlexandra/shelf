import React, { useState } from "react";
import { PreparationMethod } from "../utils/Enum";

export default function IngredientDropDown({
  options = [],
  onChange,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option
  const [selectedDegree, setSelectedDegree] = useState(""); // Selected Degree
  const [selectedMin, setSelectedMin] = useState(""); // Selected Degree

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSave = (value) => {
    setSelectedMin(value);
    if (onChange && selectedOption && selectedDegree && selectedMin) {
      onChange({ preparationMethod: selectedOption, time: selectedMin, temperature: selectedDegree });
    }
  };

  return (
    <div className="relative flex flex-row items-center gap-[1vw] flex-1 my-1">
      <div className="flex flex-row items-center w-[100%] gap-[1vw] h-[4vh]">
        {/* Dropdown button */}
        <button
          className="flex-1 bg-stone-100 h-[100%] text-left px-4 py-0.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption ? selectedOption : placeholder}
        </button>
        <input
          type="number"
          placeholder="0"
          className="px-3 w-[80px] bg-stone-100 rounded-md border border-gray-300"
          value={selectedDegree || ""}
          onChange={e => setSelectedDegree(e.target.value)}
        />
        <p>°C</p>
        <input
          type="number"
          placeholder="0"
          className="px-3 w-[80px] bg-stone-100 rounded-md border border-gray-300"
          value={selectedMin || ""}
          onChange={(e) => handleSave(e.target.value)}
        />
        <p className="pr-[20px]">perc</p>
      </div>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-[30vw] bg-stone-100 shadow-lg rounded-md max-h-40 overflow-y-auto border border-gray-300"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={option.id || index} // Ensure unique keys
                className={`px-4 py-2 cursor-pointer hover:bg-white ${
                  selectedOption?.id === option.id ? "bg-sky-200 font-bold" : ""
                }`}
                role="option"
                aria-selected={selectedOption?.id === option.id}
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
