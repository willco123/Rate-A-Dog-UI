import { useMemo } from "react";
import _ from "lodash";

type PageHook = {
  data: TableData[];
  currentPage: number;
  itemsPerPage: number;
  siblingCount?: number;
};

type TableData = {
  [index: number]: string;
};

export default function usePagination({
  data,
  currentPage,
  itemsPerPage,
  siblingCount = 1,
}: PageHook) {
  const paginationRange = useMemo(() => {
    const dots = "...";
    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    const displayedPages = siblingCount + 5;

    if (displayedPages >= numberOfPages) return _.range(1, numberOfPages + 1);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      numberOfPages,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < numberOfPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = numberOfPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = _.range(1, leftItemCount + 1);

      return [...leftRange, dots, numberOfPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = _.range(
        numberOfPages - rightItemCount + 1,
        numberOfPages + 1,
      );
      return [firstPageIndex, dots, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
    return [];
  }, [data.length, itemsPerPage, currentPage]);

  return paginationRange;
}

//Code from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
