import React, { useState, useRef } from "react";
import "./search-filter.css";

type tableData = {
  setTableData: React.Dispatch<
    React.SetStateAction<
      {
        breed: string;
        subBreed: string | null;
        rating: number;
      }[]
    >
  >;
  initialState: TableBodyData[];
};

type TableBodyData = {
  breed: string;
  subBreed: string | null;
  rating: number;
};

export default function SearchFilter({
  setTableData,
  initialState,
}: tableData) {
  const inputRef = useRef<HTMLInputElement>(null);
  function clearInput() {
    setTableData(initialState);
    if (inputRef.current) inputRef.current.value = "";
  }
  function handleClick(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    if (inputRef.current) filterTable(inputRef.current.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      filterTable(target.value);
    }
  }

  function filterTable(filterValue: string) {
    const filteredShallowArray = initialState.filter((item) => {
      const tbodyDataRow = Object.values(item);
      const tbodyDataRowLower = tbodyDataRow.map((element) => {
        if (typeof element === "string") return element.toLowerCase();
      });
      const filterValueLower = filterValue.toLocaleLowerCase();
      return tbodyDataRowLower.indexOf(filterValueLower) > -1 ? 1 : 0;
    });
    const filteredArray = [...filteredShallowArray];
    filteredArray.length != 0
      ? setTableData(filteredArray)
      : setTableData(initialState);
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
