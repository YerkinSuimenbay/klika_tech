import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./select-field.scss";
import { IOption, SelectFieldOptions } from "./SelectFieldOptions";

interface IProps {
  label: string;
  value?: IOption;
  options: IOption[];
}

export const SelectField: FC<IProps> = ({ label, value, options = [] }) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<IOption>(
    value || { id: -1, value: "All" }
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (!selectRef.current || !event.target) return;
    const target = event.target as Element;
    if (
      !selectRef.current.contains(target) ||
      target.classList.contains("select-field__label")
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOptions = (event: React.MouseEvent<HTMLDivElement>) =>
    setShowOptions((prev) => !prev);

  const handleOptionSelect = (option: IOption) => {
    setShowOptions(false);
    setSelectedOption(option);
  };

  return (
    <div className="select-field" ref={selectRef}>
      {label && <p className="select-field__label">{label}</p>}
      <div className="select-field__selected-option" onClick={toggleOptions}>
        <p>{selectedOption.value}</p>
        {showOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <SelectFieldOptions
        show={showOptions}
        options={options}
        onClick={handleOptionSelect}
      />
    </div>
  );
};
