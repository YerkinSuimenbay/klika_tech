import { ISelectFieldOptionWithId } from "../interfaces";
import { TSelectFieldOption } from "../types";

export function isSelectFieldOptionWithId(
  obj: TSelectFieldOption
): obj is ISelectFieldOptionWithId {
  return "name" in obj && "id" in obj;
}
