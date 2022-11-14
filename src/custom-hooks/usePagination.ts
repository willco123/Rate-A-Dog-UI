import { useMemo } from "react";
import _ from "lodash";

type PageData = {
  data: TableData[];
  currentPage: number;
  itemsPerPage: number;
};

type TableData = {
  [index: number]: string;
};

export default function usePagination({
  data,
  currentPage,
  itemsPerPage,
}: PageData) {
  function getPageNumbers() {
    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    if (numberOfPages === 1) return [];
    const pages = _.range(1, numberOfPages + 1);
    return pages;
  }

  const paginationRange = useMemo(() => {
    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    if (numberOfPages === 1) return [];
    const pages = _.range(1, numberOfPages + 1);
    return pages;
  }, [data.length, itemsPerPage, currentPage]);

  return paginationRange;
}
