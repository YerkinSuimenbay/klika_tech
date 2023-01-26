import React, { FC } from "react";
import { TSelectFieldOption } from "../../../utils/types";

interface IProps {
  show: boolean;
  options: TSelectFieldOption[];
  onClick: (option: TSelectFieldOption) => void;
  isLoading: boolean;
  error: string;
  onSearchChange: (search: string) => void;
  selectedOption: TSelectFieldOption;
}

export const SelectFieldOptions: FC<IProps> = ({
  show,
  options,
  onClick,
  isLoading,
  error,
  onSearchChange,
  selectedOption,
}) => {
  const renderOptions = () => {
    if (isLoading) {
      return <li className="option loading">Loading...</li>;
    }

    if (!options.length) return <li className="no-option">No option</li>;

    return options.map((option) => {
      let className = "option";

      if (option.name === selectedOption.name) {
        className += " active";
      }

      return (
        <li
          key={option.name}
          className={className}
          onClick={() => {
            onClick(option);
          }}
        >
          {option.name || "All"}
        </li>
      );
    });
  };

  if (!show) return null;
  if (error) {
    return (
      <ul className="select-field__options">
        <li className="option error">{error}</li>
      </ul>
    );
  }

  return (
    <ul className="select-field__options">
      <input
        className="search-option"
        type="text"
        placeholder="Search..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onSearchChange(event.target.value);
        }}
      />
      {renderOptions()}
    </ul>
  );
};
