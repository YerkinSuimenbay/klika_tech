import { FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  OnRowsPerPageChangeFunction,
  RowsPerPageSelector,
} from "./RowsPerPageSelector";

import "./pagination.scss";
import { PaginationButton } from "./PaginationButton";
import { RowsPerPage } from "../../../utils/enums";

interface IProps {
  pageCount: number;
  onPageChange: (newPage: number) => void;
  prevPage: VoidFunction;
  nextPage: VoidFunction;
  onRowsPerPageChange: OnRowsPerPageChangeFunction;
  rowsPerPage: RowsPerPage;
  currentPage?: number;
  pageRangeDisplayed?: number; // around current page
  marginPagesDisplayed?: number; // from two ends
  breakLabel?: string;
  nextLabel?: string;
  previousLabel?: string;
}

export const Pagination: FC<IProps> = ({
  pageCount,
  onPageChange,
  prevPage,
  nextPage,
  onRowsPerPageChange,
  rowsPerPage,
  currentPage = 1,
  pageRangeDisplayed = 4,
  marginPagesDisplayed = 2,
  breakLabel = "...",
  nextLabel = "next >",
  previousLabel = "< previous",
}) => {
  const renderButtons = () => {
    const buttons: JSX.Element[] = [];

    const rightEdge = pageCount - marginPagesDisplayed + 1;
    const leftEdge = marginPagesDisplayed;
    const rangeStart = currentPage - 1;
    const rangeEnd = currentPage + 2;

    for (let i = 1; i <= pageCount; i++) {
      if (i > leftEdge && i < rangeStart) {
        buttons.push(<PaginationButton key={i} label={breakLabel} />);
        i = rangeStart;
      }
      if (i > rangeEnd && i < rightEdge) {
        buttons.push(<PaginationButton key={i} label={breakLabel} />);
        i = rightEdge;
      }

      const button = (
        <PaginationButton
          key={i}
          label={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? "active" : ""}
        />
      );

      buttons.push(button);
    }
    return buttons;
  };

  return (
    <div className="pagination">
      <RowsPerPageSelector
        onChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
      />

      <div className="pagination__buttons">
        <PaginationButton
          label={<IoIosArrowBack size={20} />}
          className="prev"
          onClick={prevPage}
        />
        {renderButtons()}
        <PaginationButton
          label={<IoIosArrowForward size={20} />}
          className="forward"
          onClick={nextPage}
        />
      </div>
    </div>
  );
};
