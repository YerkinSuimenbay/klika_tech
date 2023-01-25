import React from "react";
import { IColumn } from "../../../utils/interfaces";

interface IProps<T> {
  rows: T[];
  columns: IColumn<T>[];
}

export function TableRow<T>({ rows, columns }: IProps<T>): JSX.Element {
  return (
    <>
      {rows.map((row, ind) => (
        <tr key={ind}>
          {columns.map((column, colInd) => (
            <TableRowCell key={column.field} column={column} row={row} />
          ))}
        </tr>
      ))}
    </>
  );
}

// TABLE ROW CELL
interface IPropsCell<T> {
  row: T;
  column: IColumn<T>;
}

export function TableRowCell<T>({ row, column }: IPropsCell<T>) {
  let cellValue: string = "";
  if (row instanceof Object && row.hasOwnProperty(column.field)) {
    cellValue = (row as any)[column.field];
  }

  return <td>{cellValue}</td>;
}
