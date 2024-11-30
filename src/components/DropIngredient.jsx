import React, { useState } from "react";

export default function DropIngredient({
  options = [],
  onChange,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option
  const [selectedAmount, setSelectedAmount] = useState(""); // Selected amount
  const [searchTerm, setSearchTerm] = useState(""); // Search input

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.name); // Update search term to show the selected option
    setIsOpen(false);
    setSelectedAmount(""); // Clear amount when a new option is selected
  };

  const handleSave = (amount) => {
    setSelectedAmount(amount);
    // Validate and pass data to parent
    if (onChange && selectedOption && amount) {
      onChange({ id: selectedOption.id, amount: parseFloat(amount) });
    }
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col items-start gap-2 flex-1 my-1">
      <div className="flex flex-row items-center w-full gap-2">
        {/* Input field as dropdown trigger */}
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-stone-100 text-left px-4 py-0.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={searchTerm || (selectedOption ? selectedOption.name : "")}
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true); // Reopen dropdown while typing
          }}
        />
        <input
          type="number"
          placeholder="0"
          className="px-3 py-0.5 w-[80px] bg-stone-100 rounded-md border border-gray-300"
          value={selectedAmount || ""}
          onChange={(e) => handleSave(e.target.value)}
        />
        <p>{selectedOption?.measurement || "No unit"}</p>
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+5px)] left-0 w-full bg-stone-200 shadow-lg rounded-md border border-gray-300 z-10">
          <ul className="max-h-[30vh] overflow-y-auto" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.id || index} // Ensure unique keys
                  className={`px-4 py-2 cursor-pointer hover:bg-white ${
                    selectedOption?.id === option.id ? "bg-sky-200 font-bold" : ""
                  }`}
                  role="option"
                  aria-selected={selectedOption?.id === option.id}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
