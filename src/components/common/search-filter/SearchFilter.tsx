import React, { useState, useRef } from "react";
import "./search-filter.css";

type tableData = {
  setTableBodyData: React.Dispatch<React.SetStateAction<TableBodyData[]>>;
  initialState: TableBodyData[] | [];
};

type TableBodyData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
};

export default function SearchFilter({
  setTableBodyData,
  initialState,
}: tableData) {
  const inputRef = useRef<HTMLInputElement>(null);
  function clearInput() {
    setTableBodyData(initialState);
    if (inputRef.current) inputRef.current.value = "";
  }
  function handleClick(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    if (inputRef.current && initialState.length > 0)
      filterTable(inputRef.current.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      if (initialState.length > 0) filterTable(target.value);
    }
  }

  function filterTable(filterValue: string) {
    const filteredShallowArray = initialState.filter((item) => {
      const tbodyDataRow = Object.values(item);
      const tbodyDataRowLower = tbodyDataRow.map((element) => {
        if (Array.isArray(element)) {
          for (let i of element) {
            if (typeof i === "string") return i.toLowerCase();
          }
        }
        if (typeof element === "number") return element.toString();
      });
      const filterValueLower = filterValue.toLowerCase();
      return tbodyDataRowLower.indexOf(filterValueLower) > -1 ? 1 : 0;
    });
    const filteredArray = [...filteredShallowArray];
    filteredArray.length != 0
      ? setTableBodyData(filteredArray)
      : setTableBodyData(initialState);
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
          ref={inputRef}
        />
        <label htmlFor="search-filter" onClick={(e) => handleClick(e)} />
        <span onClick={clearInput}>Clear</span>
      </div>
    </div>
  );
}
