import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "../utils/hooks/useClickOutside";

export default function DropAmount({
  options = [],
  onChange,
  value = {}, // Ensure value has a default object
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState();
  const [selectedMin, setSelectedMin] = useState();

  // Initialize state based on the value prop
  useEffect(() => {
    if (value) {
      setSelectedOption(value.preparation_method || null);
      setSelectedDegree(value.temperature || 0);
      setSelectedMin(value.time || 0);
    }
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleDegreeChange = (e) => {
    const value = e.target.value;
    setSelectedDegree(value === "" ? 0 : parseFloat(value));
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSelectedMin(value === "" ? 0 : parseFloat(value));
  };

  // Call onChange whenever the selected values change
  useEffect(() => {
    onChange({
      preparation_method: selectedOption,
      time: selectedMin || 0,
      temperature: selectedDegree || 0
    });
  }, [selectedOption, selectedDegree, selectedMin]);

  // Use the custom hook for click outside detection
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative flex flex-row items-center gap-[1vw] flex-1 my-1">
      <div className="flex flex-row items-center w-[100%] gap-[1vw] h-[4vh]">
        <button
          className="flex-1 bg-stone-200 h-[100%] text-left px-4 py-0.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption ? selectedOption.toLowerCase() : placeholder}
        </button>
        <input
          type="number"
          placeholder="0"
          className="px-3 w-[80px] bg-stone-200 rounded-md border border-gray-300"
          value={selectedDegree}
          onChange={handleDegreeChange}
        />
        <p>°C</p>
        <input
          type="number"
          placeholder="0"
          className="px-3 w-[80px] bg-stone-200 rounded-md border border-gray-300"
          value={selectedMin}
          onChange={handleTimeChange}
        />
        <p className="pr-[20px]">perc</p>
      </div>
      {isOpen && (
        <ul
          ref={dropdownRef} // Attach the ref returned by the hook
          className="absolute z-10 mt-1 w-[44vw] text-gray-600 bg-stone-200 shadow-lg rounded-md max-h-40 overflow-y-auto border border-gray-300"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-white ${
                  selectedOption === option ? "bg-stone-200 font-bold" : ""
                }`}
                role="option"
                aria-selected={selectedOption === option}
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

DropAmount.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    preparation_method: PropTypes.string,
    time: PropTypes.number,
    temperature: PropTypes.number
  })
};
