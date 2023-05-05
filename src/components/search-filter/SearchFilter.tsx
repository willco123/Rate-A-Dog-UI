import React, { useRef, useState, useEffect } from "react";
import "./search-filter.scss";
import { TableDataGrouped } from "../../types.js";
import filterArrayOfObjects from "../../utils/filter-array";

export default function SearchFilter({
  tableDataGrouped,
  setTableDataGrouped,
  setCurrentPage,
}: {
  tableDataGrouped: TableDataGrouped[];
  setTableDataGrouped: React.Dispatch<React.SetStateAction<TableDataGrouped[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [initialTableDataGrouped, setInitialTableDataGrouped] = useState<
    TableDataGrouped[]
  >([]);
  const inputRefObject = useRef<HTMLInputElement>(null);
  const isTableData = tableDataGrouped.length > 0;
  // const searchInputRef = inputRefObject.current //isnt recognised in jest tests
  //maybe undef on init render but defined on re-render

  useEffect(() => {
    if (initialTableDataGrouped.length === 0)
      setInitialTableDataGrouped(tableDataGrouped);
  }, [tableDataGrouped]);

  function clearInput() {
    const searchInputRef = inputRefObject.current;
    reInitTableData(initialTableDataGrouped);
    if (searchInputRef) searchInputRef.value = "";
    setCurrentPage(1);
  }

  function filterTable(
    filterValue: string,
    initialTableDataGrouped: TableDataGrouped[],
  ) {
    const filteredArray = filterArrayOfObjects<TableDataGrouped>(
      initialTableDataGrouped,
      filterValue,
    );
    filteredArray.length != 0
      ? setTableDataGrouped(filteredArray)
      : reInitTableData(initialTableDataGrouped);
    setCurrentPage(1);
  }

  function reInitTableData(initialTableDataGrouped: TableDataGrouped[]) {
    setTableDataGrouped(initialTableDataGrouped);
  }

  function handleClick() {
    const searchInputRef = inputRefObject.current;

    if (searchInputRef!.value && isTableData) {
      filterTable(searchInputRef!.value, initialTableDataGrouped);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchInput = e.target as HTMLInputElement;
      if (isTableData) filterTable(searchInput.value, initialTableDataGrouped);
    }
  }

  return (
    <div className="search-filter-container">
      <div className="search-filter-items">
        <input
          type="text"
          name="search-filter"
          id="search-filter"
          placeholder="Filter Breed"
          onKeyDown={handleKeyPress}
          ref={inputRefObject}
        />
        <label htmlFor="search-filter" onClick={handleClick} role={"button"} />
        <span onClick={clearInput} role={"button"}>
          Clear
        </span>
      </div>
    </div>
  );
}
