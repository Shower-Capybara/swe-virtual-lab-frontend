"use client";
import React from "react";

interface AppSelectInputProps {
  label?: string;
  placeholder: string;
  options: string[]; // Options for the select dropdown
  onSelect: (value: string) => void; // Handler for selection change
  error?: string;
}

const AppSelectInput: React.FC<AppSelectInputProps> = ({
  label,
  placeholder,
  options,
  onSelect,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label className="text-gray-700 text-sm font-medium">{label}</label>
      )}
      <select
        onChange={(e) => onSelect(e.target.value)}
        className={`border px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-black border-gray-300"
        }`}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default AppSelectInput;
