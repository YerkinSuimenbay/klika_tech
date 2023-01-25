import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { ISelectFieldOption } from "../../../utils/interfaces";
import { SelectFieldChangeFunction } from "../../../utils/types";
import "./select-field.scss";
import { SelectFieldOptions } from "./SelectFieldOptions";

export type SelectFieldFetchOptionsFunction<T> = (
  endpoint: T,
  search?: string
) => Promise<[ISelectFieldOption[], string | null]>;

interface IProps<T> {
  field: string;
  label: string;
  value?: ISelectFieldOption;
  onChange: SelectFieldChangeFunction;
  fetchOptions: SelectFieldFetchOptionsFunction<T>;
  endpoint: T;
}

export function SelectField<T>({
  field,
  label,
  value,
  onChange,
  fetchOptions,
  endpoint,
}: IProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const selectRef = useRef<HTMLDivElement | null>(null);

  const [options, setOptions] = useState<ISelectFieldOption[]>([]);
  const [search, setSearch] = useState("");

  const [selectedOption, setSelectedOption] = useState<ISelectFieldOption>(
    value || { id: -1, name: "All" }
  );
  const [showOptions, setShowOptions] = useState(false);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 1000);

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

  const toggleOptions = async (event: React.MouseEvent<HTMLDivElement>) => {
    setShowOptions((prev) => !prev);

    if (!showOptions) {
      setIsLoading(true);

      const [options, errorMessage] = await fetchOptions(endpoint);

      if (errorMessage) {
        console.log(errorMessage);
        setError(errorMessage);
      } else {
        setOptions([{ id: -1, name: "All" }, ...options]);
      }

      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: ISelectFieldOption) => {
    setShowOptions(false);
    setSelectedOption(option);
    onChange(field, option);
  };

  const updateOptions = useCallback(async () => {
    setIsLoading(true);
    const [options, errorMessage] = await fetchOptions(endpoint, search);
    if (errorMessage) {
      console.log(errorMessage);
      setError(errorMessage);
    } else {
      setOptions([{ id: -1, name: "All" }, ...options]);
    }
    setIsLoading(false);
  }, [endpoint, fetchOptions, search]);

  useEffect(() => {
    updateOptions();
  }, [updateOptions]);

  return (
    <div className="select-field" ref={selectRef}>
      {label && <p className="select-field__label">{label}</p>}
      <div className="select-field__selected-option" onClick={toggleOptions}>
        <p>{selectedOption.name}</p>
        {showOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <SelectFieldOptions
        show={showOptions}
        options={options}
        onClick={handleOptionSelect}
        isLoading={isLoading}
        error={error}
        onSearchChange={debouncedSetSearch}
        selectedOption={selectedOption}
      />
    </div>
  );
}
