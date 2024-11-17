"use client";
import React from "react";

interface AppPlaintInputProps {
  label?: string;
  placeholder: string;
  type?: string;
  error?: string | null;
  onChange?: (value: string) => void;
  name?: string;
}

const AppPlainInput: React.FC<AppPlaintInputProps> = ({
  label,
  onChange,
  placeholder,
  type = "text",
  error,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label className="text-gray-700 text-sm font-medium">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`border px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : " focus:ring-black border-gray-300"
        }`}
        onChange={(e) => onChange && onChange(e.target.value)}
        name={name}
      />
      {error !== undefined && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default AppPlainInput;
