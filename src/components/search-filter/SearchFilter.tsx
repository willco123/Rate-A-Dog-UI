import React, { useRef } from "react";
import "./search-filter.css";
import filterArrayOfObjects from "../../utils/filter-array";

type SearchFilterProps = {
  setTableBodyData: React.Dispatch<React.SetStateAction<TableData[]>>;
  initialState: TableData[] | [];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type TableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
};

export default function SearchFilter({
  setTableBodyData,
  initialState,
  setCurrentPage,
}: SearchFilterProps) {
  const inputRefObject = useRef<HTMLInputElement>(null);
  const searchInputRef = inputRefObject.current;
  const isInitialState = initialState.length > 0;

  function clearInput() {
    setTableBodyData(initialState);
    if (searchInputRef) searchInputRef.value = "";
    setCurrentPage(1);
  }

  function handleClick() {
    if (searchInputRef && isInitialState) filterTable(searchInputRef.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchInput = e.target as HTMLInputElement;
      if (isInitialState) filterTable(searchInput.value);
    }
  }

  function filterTable(filterValue: string) {
    const filteredArray = filterArrayOfObjects<TableData>(
      initialState,
      filterValue,
    );
    filteredArray.length != 0
      ? setTableBodyData(filteredArray)
      : setTableBodyData(initialState);
    setCurrentPage(1);
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
        <label htmlFor="search-filter" onClick={handleClick} />
        <span onClick={clearInput}>Clear</span>
      </div>
    </div>
  );
}
