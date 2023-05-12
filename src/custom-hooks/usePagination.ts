import { useMemo } from "react";
import range from "lodash/range";

export type PageHook = {
  dataLength: number;
  currentPage: number;
  itemsPerPage: number;
  siblingCount?: number;
};

export default function usePagination({
  dataLength,
  currentPage,
  itemsPerPage,
  siblingCount = 1,
}: PageHook) {
  const paginationRange = useMemo(() => {
    const dots = "...";
    const numberOfPages = Math.ceil(dataLength / itemsPerPage);
    const displayedPages = siblingCount + 5;

    if (displayedPages >= numberOfPages) return range(1, numberOfPages + 1);

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
      let leftRange = range(1, leftItemCount + 1);

      return [...leftRange, dots, numberOfPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        numberOfPages - rightItemCount + 1,
        numberOfPages + 1,
      );
      return [firstPageIndex, dots, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex + 1);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
    return [];
  }, [dataLength, itemsPerPage, currentPage]);

  return paginationRange;
}

//Code from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
