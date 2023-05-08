import React, { memo, useState, useMemo } from "react";
import TableComponent from "../table-component/TableComponent";
import useTableDataInit from "../../custom-hooks/useTableDataInit";
import Pagination from "../pagination/Pagination";
import SearchFilter from "../search-filter/SearchFilter.js";
import { TableData } from "../../types";

function TableAndFilters({
  setFilteredBreed,
  filteredBreed,
  getTableData,
}: {
  filteredBreed:
    | {
        breed: string;
        subBreed: string | null;
      }
    | undefined;
  setFilteredBreed: React.Dispatch<
    React.SetStateAction<
      | {
          breed: string;
          subBreed: string | null;
        }
      | undefined
    >
  >;
  getTableData: () => Promise<TableData[] | undefined>;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    tableDataJSX,
    tableDataGrouped,
    setTableDataGrouped,
    clearSelection,
  } = useTableDataInit({ getTableData, setFilteredBreed, filteredBreed });
  const itemsPerPage = 10;
  const tableDataLength = tableDataJSX.length;

  const currentTableDataJSX = useMemo(() => {
    if (!tableDataJSX) return [];
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return tableDataJSX.length
      ? tableDataJSX.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, tableDataJSX]);

  return (
    <div>
      <button onClick={clearSelection}>Clear Selection</button>
      <SearchFilter
        tableDataGrouped={tableDataGrouped}
        setTableDataGrouped={setTableDataGrouped}
        setCurrentPage={setCurrentPage}
      />
      <TableComponent
        tbodyData={currentTableDataJSX}
        theadData={["Breed", "SubBreed", "Rating", "Votes"]}
      />
      <Pagination
        dataLength={tableDataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}

const TableAndFiltersMemo = memo(TableAndFilters);
export default TableAndFiltersMemo;
