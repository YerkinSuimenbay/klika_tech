import React, { FC, useState } from "react";

export interface IOption {
  id: number;
  value: string;
}

interface IProps {
  show: boolean;
  options: IOption[];
  onClick: (option: IOption) => void;
  //   searchOptions: (value: string) => void;
}

export const SelectFieldOptions: FC<IProps> = ({ show, options, onClick }) => {
  const [search, setSearch] = useState("");

  const filterOptions = (options: IOption[]): IOption[] => {
    return options.filter((option) =>
      option.value.toLowerCase().includes(search.toLowerCase().trim())
    );
  };

  const renderOptions = () => {
    const filteredOptions = filterOptions(options);
    if (!filteredOptions.length)
      return <li className="no-option">No option</li>;

    return filteredOptions.map((option) => (
      <li
        key={option.id}
        className="option"
        onClick={() => {
          onClick(option);
        }}
      >
        {option.value}
      </li>
    ));
  };

  if (!show) return null;

  return (
    <ul className="select-field__options">
      <input
        className="search-option"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
      />
      {renderOptions()}
    </ul>
  );
};
