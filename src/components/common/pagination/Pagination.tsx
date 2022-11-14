import React, { useState, useEffect } from "react";
import { TableBodyData } from "../paged-table/types";
import _ from "lodash";
import "./pagination.css";
import usePagination from "../../../custom-hooks/usePagination";

type PageData = {
  data: TableBodyData[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PageData) {
  const paginationRange = usePagination({ currentPage, data, itemsPerPage });
  console.log(paginationRange);
  return (
    <ul>
      {paginationRange.map((pageNumber) => {
        console.log(pageNumber);
        return (
          <li disabled onClick={() => onPageChange(pageNumber)}>
            {currentPage}
          </li>
        );
      })}
    </ul>
  );
}
