import React, { useState, useEffect, useCallback,useRef } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import CategoryInput from "./CategoryInput";
import plus from "../../assets/icons/plus.png";

function DropIngredient({
  options = [],
  onChange,
  value = [],
  placeholder = "Select an option"
}) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [localValue, setLocalValue] = useState(
    Array.isArray(value) && value.length > 0
      ? value
      : [{ name: "", amount: "", measurement: "", type: "" }]
  );

  const dropdownRef = useClickOutside(() => setOpenDropdownIndex(null));

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value);
    } else {
      setLocalValue([{ name: "", amount: "", measurement: "", type: "" }]);
    }
  }, [value]);

  const handleOptionClick = (option, index) => {
    const updatedValues = [...localValue];
    updatedValues[index] = {
      ...updatedValues[index],
      id: option.id,
      name: option.name
    };
    setLocalValue(updatedValues);
    setOpenDropdownIndex(null);
    onChange && onChange(updatedValues);
  };

  const handleAmountChange = (amount, index) => {
    const updatedValues = [...localValue];
    updatedValues[index] = {
      ...updatedValues[index],
      amount: parseFloat(amount) || null
    };
    setLocalValue(updatedValues);
    onChange && onChange(updatedValues);
  };

  const inputRefs = useRef([]);

  const handleNameChange = (name, index) => {
    const updatedValues = [...localValue];
    updatedValues[index] = { ...updatedValues[index], name };
    setLocalValue(updatedValues);

    if (openDropdownIndex !== index) {
      setOpenDropdownIndex(index);
    }

    // Maintain focus
    setTimeout(() => inputRefs.current[index]?.focus(), 0);
  };

  const handleTypeChange = (type) => {
    const updatedValues = localValue.map((el) => ({
      ...el,
      type
    }));
    setLocalValue(updatedValues);
    onChange && onChange(updatedValues);
  };

  const handleAddRow = () => {
    const newRow = {
      name: "",
      measurement: "",
      amount: null,
      type: localValue[0]?.type || ""
    };
    const updatedValues = [...localValue, newRow];
    setLocalValue(updatedValues);
    onChange && onChange(updatedValues);
  };

  const handleRemoveRow = (index) => {
    const updatedValues = localValue.filter((_, i) => i !== index);
    if (updatedValues.length === 0) {
      updatedValues.push({
        name: "",
        measurement: "",
        amount: "",
        type: localValue[0]?.type || ""
      });
    }
    setLocalValue(updatedValues);
    onChange && onChange(updatedValues);
  };

  const filteredOptions = useCallback(
    (name) =>
      options.filter((option) =>
        option.name.toLowerCase().includes(name?.toLowerCase() || "")
      ),
    [options]
  );

  return (
    <div className="w-full flex flex-col justify-start">
      <CategoryInput
        onChange={(e) => handleTypeChange(e.target.value)}
        value={localValue[0]?.type || ""}
        placeholder="Add a category"
      />
      <div>
        {localValue.map((el, index) => (
          <div
            key={`${el.name || "empty"}-${index}`}
            className="relative flex flex-col items-start gap-2 flex-1"
          >
            <div className="flex flex-row items-center w-full gap-2">
              <div className="flex-1">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  placeholder={placeholder}
                  className="w-[100%] text-left px-4 py-0.5"
                  value={el.name || ""}
                  onClick={() => setOpenDropdownIndex(index)}
                  onChange={(e) => handleNameChange(e.target.value, index)}
                />
                <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="0"
                  className="py-0.5 w-[60px]"
                  value={el.amount || ""}
                  onChange={(e) => handleAmountChange(e.target.value, index)}
                />
                <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
              </div>
              <p>
                {options.find((opt) => opt.id === el.id)?.measurement ||
                  el.measurement ||
                  ""}
              </p>
              <button
                className={`w-[22px] h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50 ${
                  localValue.length - 1 === index ? "" : "rotate-45"
                }`}
                onClick={
                  localValue.length - 1 === index
                    ? handleAddRow
                    : () => handleRemoveRow(index)
                }
              >
                <img
                  src={plus}
                  alt={localValue.length - 1 === index ? "plus" : "remove"}
                />
              </button>
            </div>
            {openDropdownIndex === index && (
              <div
                ref={dropdownRef}
                className="absolute top-[calc(100%+5px)] left-0 w-full bg-stone-200 shadow-lg rounded-md border border-gray-300 z-10"
              >
                <ul className="max-h-[30vh] overflow-y-auto" role="listbox">
                  {filteredOptions(el.name).length > 0 ? (
                    filteredOptions(el.name).map((option, idx) => (
                      <li
                        key={option.id || idx}
                        className={`px-4 py-2 cursor-pointer hover:bg-green-300 ${
                          el.id === option.id ? "bg-transparent font-bold" : ""
                        }`}
                        role="option"
                        aria-selected={el.id === option.id}
                        onClick={() => handleOptionClick(option, index)}
                      >
                        {option.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      No options found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropIngredient;
