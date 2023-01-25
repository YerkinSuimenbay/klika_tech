import { FC } from "react";
import { RowsPerPage } from "../../../utils/enums";

import "./pagination.scss";

export type OnRowsPerPageChangeFunction = (rowPerPage: RowsPerPage) => void;

interface IProps {
  onChange: OnRowsPerPageChangeFunction;
  rowsPerPage: RowsPerPage;
}

export const RowsPerPageSelector: FC<IProps> = ({ onChange, rowsPerPage }) => {
  const values = Object.values(RowsPerPage).filter((v) => !isNaN(Number(v)));

  return (
    <div className="items-per-page-selector">
      {values.map((_rowsPerPage) => {
        return (
          <button
            key={_rowsPerPage}
            className={rowsPerPage === _rowsPerPage ? "active" : ""}
            onClick={() => onChange(_rowsPerPage as RowsPerPage)}
          >
            {_rowsPerPage}
          </button>
        );
      })}
    </div>
  );
};
