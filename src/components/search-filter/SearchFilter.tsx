import React, { useRef } from "react";
import "./search-filter.scss";
import { BreedData } from "../../types.js";

type SearchFilterProps = {
  filterTable: (filterValue: string, breedData: BreedData[]) => void;
  breedData: BreedData[] | [];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  reInitTableData: (breedData: BreedData[]) => void;
};

export default function SearchFilter({
  filterTable,
  breedData,
  setCurrentPage,
  reInitTableData,
}: SearchFilterProps) {
  const inputRefObject = useRef<HTMLInputElement>(null);
  const isbreedData = breedData.length > 0;
  // const searchInputRef = inputRefObject.current //isnt recognised in jest tests
  //maybe undef on init render but defined on re-render
  function clearInput() {
    const searchInputRef = inputRefObject.current;
    reInitTableData(breedData);
    if (searchInputRef) searchInputRef.value = "";
    setCurrentPage(1);
  }

  function handleClick() {
    const searchInputRef = inputRefObject.current;

    if (searchInputRef!.value && isbreedData) {
      filterTable(searchInputRef!.value, breedData);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchInput = e.target as HTMLInputElement;
      if (isbreedData) filterTable(searchInput.value, breedData);
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
