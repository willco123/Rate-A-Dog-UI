import React, { useEffect, useState, useMemo } from "react";
import "./rated-dogs.css";
import TableComponent from "../../components/table-component/TableComponent";
import { getBreeds } from "../../services/dog-ceo";
import CollapsibleSpan from "../../components/collapsible-span/CollapsibleSpan";
import SearchFilter from "../../components/search-filter/SearchFilter";
import Pagination from "../../components/pagination/Pagination";
import type { BreedData, TableData, TableDataJSX } from "../../types";
import filterArrayOfObjects from "../../utils/filter-array";
import {
  mimicDbDataFromFetch,
  dataDBToTableData,
  tableDataToTdJSXRatedDogs,
} from "../../utils/format-data";

export default function RatedDogs() {
  const [breedData, setBreedData] = useState<BreedData[] | []>([]);
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [tableDataJSX, setTableDataJSX] = useState<TableDataJSX[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const currentTableDataJSX = useMemo(() => {
    if (!tableDataJSX) return [];
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return tableDataJSX.length
      ? tableDataJSX.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, tableDataJSX]);

  useEffect(() => {
    (async () => {
      //should grab data from the backend, using a hack for display purposes atm
      const hackyBreedsList = await mimicDbDataFromFetch();
      setBreedData(hackyBreedsList);
    })();
  }, []);

  useEffect(() => {
    const tableData = dataDBToTableData(breedData);
    setTableData(tableData);
  }, [breedData]);

  useEffect(() => {
    const tableDataJSX = tableDataToTdJSXRatedDogs(
      tableData,
      handleDropDownChange,
    );
    setTableDataJSX(tableDataJSX);
  }, [tableData]);

  function filterTable(filterValue: string, breedData: BreedData[]) {
    const filteredArray = filterArrayOfObjects<BreedData>(
      breedData,
      filterValue,
    );
    const filteredTableData: TableData[] = dataDBToTableData(filteredArray);
    filteredArray.length != 0
      ? setTableData(filteredTableData)
      : reInitTableData(breedData);
    setCurrentPage(1);
  }

  function reInitTableData(breedData: BreedData[]) {
    const tableData = dataDBToTableData(breedData);
    setTableData(tableData);
  }

  function handleDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
    breedDataRowIndex: number,
  ) {
    const selectedSubBreed = e.target.value;
    const targetBreed = Object.values(breedData[breedDataRowIndex]);
    const subBreedArray = targetBreed[1] as string[];
    const subBreedIndex = subBreedArray.indexOf(selectedSubBreed);
    const ratingArray = targetBreed[2] as number[];
    const associatedBreedRating = ratingArray[subBreedIndex];
    const currentTableDataRowIndex = tableData.findIndex(
      (obj) => obj.breed === tableRowId,
    );

    const tableDataClone = tableData.map((element) => {
      return { ...element };
    });

    (tableDataClone[currentTableDataRowIndex].rating = associatedBreedRating),
      setTableData(tableDataClone);
  }

  return (
    <div className="rated-dogs">
      <h1 className="title">View Breed Ratings</h1>
      <CollapsibleSpan
        WrappedComponent={
          <SearchFilter
            filterTable={filterTable}
            breedData={breedData}
            setCurrentPage={setCurrentPage}
            reInitTableData={reInitTableData}
          />
        }
        displayedText={"Filter Breed"}
      />
      <div className="table-container">
        <TableComponent
          key={"table-component"}
          theadData={["Breed", "Sub-Breed", "Rating"]}
          tbodyData={currentTableDataJSX}
        />
      </div>
      {tableData && (
        <Pagination
          dataLength={tableData.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

// onChange={(e) =>
//   handleDropDownChange(
//     e,
//     tableParentElement,
//     currentTableDataRowIndex,
//   )
// }

//Test if

// function initialiseRating(breedObject: BreedData) {
//   const ratingtoBeDisplayed = breedObject.rating[0];
//   const breedObjectCopy = breedObject as unknown as IntermittentTableData;
//   breedObjectCopy.rating = ratingtoBeDisplayed;
//   return breedObjectCopy;
// }

//tableDataClone[currentTableDataRowIndex] is undefined
//tableData is empty for some reason
