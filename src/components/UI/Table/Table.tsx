import { TableHeader } from "./TableHeader";
import { NoTableRow, TableRow } from "./TableRow";
import "./table.scss";
import { IColumn, TableSort } from "../../../utils/interfaces";
import { TableSortFunction } from "../../../utils/types";
import { GrPowerReset } from "react-icons/gr";

interface IProps<T, V> {
  total: number;
  rows: T[];
  columns: IColumn<T>[];
  sort: TableSort<V>;
  onSort: TableSortFunction<V>;
  refetchTable: VoidFunction;
}

export function Table<T, V>({
  total,
  rows,
  columns,
  sort,
  onSort,
  refetchTable,
}: IProps<T, V>): JSX.Element {
  return (
    <>
      <h3 className="table-top">
        <div className="table-top__title">
          <p>Playlist</p>
          <GrPowerReset onClick={refetchTable} className="refetch-table-btn" />
        </div>
        <p className="table-top__total">
          Total:
          <b>{total}</b>
        </p>
      </h3>
      <table className="table">
        <thead>
          <TableHeader columns={columns} sort={sort} onSort={onSort} />
        </thead>
        <tbody>
          {rows.length ? (
            <TableRow rows={rows} columns={columns} />
          ) : (
            <NoTableRow colSpan={columns.length} label="NOT FOUND" />
          )}
        </tbody>
      </table>
    </>
  );
}
