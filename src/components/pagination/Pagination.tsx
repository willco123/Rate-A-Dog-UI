import React from "react";
import _ from "lodash";
import "./pagination.css";
import usePagination from "../../custom-hooks/usePagination";
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
        className={classnames("pagination-container", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="pagination-arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (typeof pageNumber === "number")
          return <li onClick={() => onPageChange(pageNumber)}>{pageNumber}</li>;
        if (typeof pageNumber === "string") return <li>{pageNumber}</li>;
      })}
      <li
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
