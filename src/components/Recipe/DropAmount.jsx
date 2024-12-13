import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

export default function DropAmount({
  options = [],
  onChange,
  value = {},
  placeholder = "Select an option"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState();
  const [selectedMin, setSelectedMin] = useState();
  const isInternalUpdate = useRef(false); // Ref to prevent update loop

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleDegreeChange = (e) => {
    const newValue = e.target.value;
    setSelectedDegree(newValue === "" ? 0 : parseFloat(newValue));
  };

  const handleTimeChange = (e) => {
    const newValue = e.target.value;
    setSelectedMin(newValue === "" ? 0 : parseFloat(newValue));
  };

  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return; // Skip if the update comes from internal state
    }
    setSelectedOption(value.preparation_method || null);
    setSelectedDegree(value.temperature || 0);
    setSelectedMin(value.time || 0);
  }, [value]);

  useEffect(() => {
    isInternalUpdate.current = true; // Mark the update as internal
    onChange({
      preparation_method: selectedOption,
      time: selectedMin || 0,
      temperature: selectedDegree || 0
    });
  }, [selectedOption, selectedDegree, selectedMin]);

  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative flex flex-1 flex-row items-center gap-[1vw] my-1">
      <div className="flex md:flex-row flex-col flex-1 items-center gap-[1vw]">
          <div className="flex flex-col w-[100%]">
            <button
              className={`${
                selectedOption ? "text-black" : "text-gray-400"
              } flex-1 h-[100%] text-left px-4 focus:outline-none`}
              onClick={() => setIsOpen((prev) => !prev)}
              onFocus={(e) => {
                e.target.nextElementSibling.classList.remove("bg-stone-300");
                e.target.nextElementSibling.classList.add("bg-black");
              }}
              onBlur={(e) => {
                e.target.nextElementSibling.classList.remove("bg-black");
                e.target.nextElementSibling.classList.add("bg-stone-300");
              }}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              {selectedOption ? selectedOption.toLowerCase() : placeholder}
            </button>
            <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
          </div>
          <div className="flex flex-row w-[100%] md:w-[30%]">
            <div>
              <input
                type="number"
                placeholder="0"
                className="px-3 w-[80px]"
                value={selectedDegree || ""}
                onChange={handleDegreeChange}
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
            <p>°C</p>
            <div>
              <input
                type="number"
                placeholder="0"
                className="px-3 md:w-[80px] w-[120px]"
                value={selectedMin || ""}
                onChange={handleTimeChange}
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
            <p className="pr-[20px]">perc</p>
          </div>
      </div>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-[calc(100%+5px)] z-10 mt-1 w-[100%] text-gray-600 bg-stone-200 shadow-lg rounded-md max-h-40 overflow-y-auto"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-green-300 ${
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
