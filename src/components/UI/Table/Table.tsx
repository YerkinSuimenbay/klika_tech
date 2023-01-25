import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import "./table.scss";
import { IColumn, TableSort } from "../../../utils/interfaces";
import { TableSortFunction } from "../../../utils/types";

interface IProps<T, V> {
  rows: T[];
  columns: IColumn<T>[];
  sort: TableSort<V>;
  onSort: TableSortFunction<V>;
}

export function Table<T, V>({
  rows,
  columns,
  sort,
  onSort,
}: IProps<T, V>): JSX.Element {
  return (
    <table className="table">
      <thead>
        <TableHeader columns={columns} sort={sort} onSort={onSort} />
      </thead>
      <tbody>
        <TableRow rows={rows} columns={columns} />
      </tbody>
    </table>
  );
}
