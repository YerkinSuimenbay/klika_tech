import { FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ItemsPerPageSelector } from "./ItemsPerPageSelector";

import "./pagination.scss";
import { PaginationButton } from "./PaginationButton";

interface IProps {
  pageCount: number;
  onPageChange: (newPage: number) => void;
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
          onClick={onPageChange}
          className={currentPage === i ? "active" : ""}
        />
      );

      buttons.push(button);
    }
    return buttons;
  };

  return (
    <div className="pagination">
      <ItemsPerPageSelector />

      <div className="pagination__buttons">
        <PaginationButton
          label={<IoIosArrowBack size={20} />}
          className="prev"
        />
        {renderButtons()}
        <PaginationButton
          label={<IoIosArrowForward size={20} />}
          className="forward"
        />
      </div>
    </div>
  );
};
