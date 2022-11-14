import React, { useState, useEffect } from "react";
import { TableBodyData } from "../paged-table/types";
import _ from "lodash";
import "./pagination.css";
import usePagination from "../../../custom-hooks/usePagination";

type PageData = {
  data: TableData[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

type TableData = {
  [index: number]: string;
};

export default function Pagination({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PageData) {
  const paginationRange = usePagination({ currentPage, data, itemsPerPage });

  return (
    <ul>
      {paginationRange.map((pageNumber) => {
        if (typeof pageNumber === "number")
          return <li onClick={() => onPageChange(pageNumber)}>{pageNumber}</li>;
        if (typeof pageNumber === "string") return <li>{pageNumber}</li>;
      })}
    </ul>
  );
}

// onClick={(pageNumber) => onPageChange(pageNumber)}
