import React from "react";
import "./pagination.scss";
import usePagination from "../../custom-hooks/usePagination.js";
import classnames from "classnames";

export type PageProps = {
  dataLength: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  dataLength,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PageProps) {
  const paginationRange = usePagination({
    currentPage,
    dataLength,
    itemsPerPage,
  });
  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination-container">
      <li
        key={"left-arrow"}
        className={classnames("pagination-container", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="pagination-arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (typeof pageNumber === "number")
          return (
            <li key={pageNumber} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          );
        if (typeof pageNumber === "string")
          return <li key={"dots: " + index}>{pageNumber}</li>;
      })}
      <li
        key={"right-arrow"}
        className={classnames("pagination-container", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="pagination-arrow right" />
      </li>
    </ul>
  );
}

// onClick={(pageNumber) => onPageChange(pageNumber)}
