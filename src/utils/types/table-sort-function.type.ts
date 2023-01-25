import { TableSort } from "../interfaces";

export type TableSortFunction<T> = (newSort: TableSort<T>) => void;
