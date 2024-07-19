import { useState } from "react";
import { PriorityCircle } from "./PriorityCircle";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="custom-select">
      <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption && (
          <span className="custom-select-label">
            <PriorityCircle priority={selectedOption.value} />
            {selectedOption.label}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="custom-select-options">
          {options.map(option => (
            <div
              key={option.value}
              className="custom-select-option"
              onClick={() => handleOptionClick(option.value)}
            >
              <PriorityCircle priority={option.value} />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};