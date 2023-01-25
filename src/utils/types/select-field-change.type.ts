import { ISelectFieldOption } from "../interfaces";

export type SelectFieldChangeFunction = (
  field: string,
  selectedOption: ISelectFieldOption
) => void;
