import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import "./table.scss";

export interface IColumn<T> {
  key: string;
  title: string;
  width?: number;
  render?: (column: IColumn<T>, item: T) => void;
}

interface IProps<T> {
  rows: T[];
  columns: IColumn<T>[];
}

export function Table<T>({ rows, columns }: IProps<T>): JSX.Element {
  return (
    <table className="table">
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow rows={rows} columns={columns} />
      </tbody>
    </table>
  );
}
