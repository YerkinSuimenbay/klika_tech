import {
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { Order } from "../../../utils/enums";
import { IColumn, TableSort } from "../../../utils/interfaces";
import { TableSortFunction } from "../../../utils/types";

interface IProps<T, V> {
  columns: IColumn<T>[];
  sort: TableSort<V>;
  onSort: TableSortFunction<V>;
}

export const TableHeader = <T, V>({ columns, sort, onSort }: IProps<T, V>) => {
  return (
    <tr>
      {columns.map((column, ind) => (
        <TableHeaderCell
          key={column.field}
          column={column}
          sort={sort}
          onSort={onSort}
        />
      ))}
    </tr>
  );
};

// TABLE HEADER CELL

interface IPropsCell<T, V> {
  column: IColumn<T>;
  sort: TableSort<V>;
  onSort: TableSortFunction<V>;
}

export function TableHeaderCell<T, V>({
  column,
  sort,
  onSort,
}: IPropsCell<T, V>) {
  const { field, order } = sort;
  let isSorted = false;

  let className = "table-header-cell";
  if (column.field === field && order !== Order.none) {
    className += ` sorted ${order}`;
    isSorted = true;
  }

  const handleClick = () => {
    if (column.field !== field) {
      onSort({ field: column.field as V, order: Order.asc });
      return;
    }

    let nextOrder: Order;
    if (order === Order.none) {
      nextOrder = Order.asc;
    } else if (order === Order.asc) {
      nextOrder = Order.desc;
    } else {
      nextOrder = Order.none;
    }

    onSort({ field: column.field as V, order: nextOrder });
  };

  const renderAscending = () => {
    if (isSorted && order === Order.asc) {
      return (
        <IoIosArrowDropupCircle
          className="circle"
          onClick={() =>
            onSort({ field: column.field as V, order: Order.none })
          }
        />
      );
    }

    return (
      <IoIosArrowDropup
        onClick={() => onSort({ field: column.field as V, order: Order.asc })}
      />
    );
  };
  const renderDescending = () => {
    if (isSorted && order === Order.desc) {
      return (
        <IoIosArrowDropdownCircle
          className="circle"
          onClick={() =>
            onSort({ field: column.field as V, order: Order.none })
          }
        />
      );
    }
    return (
      <IoIosArrowDropdown
        onClick={() => onSort({ field: column.field as V, order: Order.desc })}
      />
    );
  };

  return (
    <th
      key={column.field}
      className={className}
      style={{ width: column.width }}
      // onClick={handleClick}
    >
      <div className="table-header-cell__content">
        <span className="table-header-cell__content__title">
          {column.title}
        </span>
        <div className="table-header-cell__content__arrows">
          {renderAscending()}
          {renderDescending()}
        </div>
      </div>
    </th>
  );
}
