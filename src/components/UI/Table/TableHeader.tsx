import { IColumn } from "./Table";
import {
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

interface IProps<T> {
  columns: IColumn<T>[];
}

export const TableHeader = <T,>({ columns }: IProps<T>) => {
  return (
    <tr>
      {columns.map((column, ind) => (
        <TableHeaderCell key={column.key} column={column} />
      ))}
    </tr>
  );
};

// TABLE HEADER CELL
interface IPropsCell<T> {
  column: IColumn<T>;
}

export function TableHeaderCell<T>({ column }: IPropsCell<T>) {
  return (
    <th key={column.key} className="table-header-cell">
      <div className="table-header-cell__content">
        <span className="table-header-cell__content__title">
          {column.title}
        </span>
        <div className="table-header-cell__content__arrows">
          {/* SORTED => CIRCLE */}
          {/* <IoIosArrowDropupCircle size={30} />
          <IoIosArrowDropdownCircle size={30} /> */}
          <IoIosArrowDropup size={30} />
          <IoIosArrowDropdown size={30} />
        </div>
      </div>
    </th>
  );
}
