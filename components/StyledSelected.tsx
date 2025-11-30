"use client";

import Select, { StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface StyledSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  hasError?: boolean;
  testId?: string;
}

export default function StyledSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isDisabled = false,
  hasError = false,
  testId,
}: StyledSelectProps) {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      height: "48px",
      minHeight: "48px",
      borderRadius: "8px",
      borderColor: hasError
        ? "#ef4444"
        : state.isFocused
        ? "#59A5B2"
        : "#d1d5db",
      borderWidth: "1px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(89, 165, 178, 0.2)" : "none",
      "&:hover": {
        borderColor: hasError ? "#ef4444" : "#59A5B2",
      },
      backgroundColor: isDisabled ? "#f3f4f6" : "#fff",
      cursor: isDisabled ? "not-allowed" : "pointer",
      fontFamily: "Inter, sans-serif",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#59A5B2"
        : state.isFocused
        ? "rgba(89, 165, 178, 0.1)"
        : "#fff",
      color: state.isSelected ? "#fff" : "#374151",
      cursor: "pointer",
      padding: "10px 16px",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "#59A5B2"
          : "rgba(89, 165, 178, 0.15)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#374151",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#59A5B2" : "#6b7280",
      "&:hover": {
        color: "#59A5B2",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      marginTop: "4px",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => onChange(option?.value || "")}
      styles={customStyles}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isSearchable={false}
      data-testid={testId}
    />
  );
}