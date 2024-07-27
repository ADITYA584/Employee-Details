// CustomDropdown.jsx
import React, { useState } from "react";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full p-2 border rounded flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <div className="flex items-center">
            <img
              src={value.flag}
              alt={value.country}
              className="w-6 h-4 mr-2"
            />
            {value.country}
          </div>
        ) : (
          "Select a country"
        )}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute w-full bg-white border rounded mt-2 max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              <img
                src={option.flag}
                alt={option.country}
                className="w-6 h-4 mr-2"
              />
              {option.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
