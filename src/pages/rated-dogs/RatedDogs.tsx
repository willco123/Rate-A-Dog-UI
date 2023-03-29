import React, { useEffect, useState, useMemo } from "react";
import "./rated-dogs.css";
import TableComponent from "../../components/table-component/TableComponent.js";
import CollapsibleSpan from "../../components/collapsible-span/CollapsibleSpan.js";
import SearchFilter from "../../components/search-filter/SearchFilter.js";
import Pagination from "../../components/pagination/Pagination.js";
import filterArrayOfObjects from "../../utils/filter-array.js";
import { setFloatsToTwoDp } from "../../utils/format-data/format-data.js";
import {
  dataDBToTableData,
  tableDataToTdJSXRatedDogs,
} from "../../utils/format-data/rated-dogs-data.js";
import { getDbDogs } from "../../services/backend";
import type {
  BreedData,
  TableData,
  TableDataJSX,
  ActiveSubBreeds,
} from "../../types.js";

export default function RatedDogs() {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [breedData, setBreedData] = useState<BreedData[] | []>([]);
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [tableDataJSX, setTableDataJSX] = useState<TableDataJSX[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedBreedUrls, setSelectedBreedUrls] = useState<(string | null)[]>(
    [null],
  );
  const [activeSubBreeds, setActiveSubBreeds] = useState<ActiveSubBreeds[]>([]);
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
      const allDogsFromDB = await getDbDogs();
      if (!allDogsFromDB) return;
      const allDogsFromDBTwoDp = setFloatsToTwoDp(allDogsFromDB);
      setBreedData(allDogsFromDBTwoDp);
    })();
  }, []);

  useEffect(() => {
    const tableData = dataDBToTableData(breedData);
    const initActiveSubBreeds: ActiveSubBreeds[] = tableData.map(
      ({ breed, subBreed }) => {
        const output = {
          breed: breed,
          activeSubBreed: subBreed[0],
        };
        return output;
      },
    );

    setActiveSubBreeds(initActiveSubBreeds);
    setTableData(tableData);
  }, [breedData]);

  useEffect(() => {
    const tableDataJSX = tableDataToTdJSXRatedDogs(
      tableData,
      handleDropDownChange,
      handleRadioChange,
    );

    setTableDataJSX(tableDataJSX);
  }, [tableData]);

  useEffect(() => {
    if (selectedBreed === null) return;

    const associatedSubBreed = activeSubBreeds.find((element) => {
      return element.breed === selectedBreed;
    });

    const breedObject = breedData.find((element) => {
      return (
        element.breed === selectedBreed &&
        element.subBreed == associatedSubBreed?.activeSubBreed
      );
    });
    if (!breedObject) throw new Error("breedObject is undefined");
    setSelectedBreedUrls(breedObject.url);
  }, [selectedBreed, activeSubBreeds]);

  useEffect(() => {
    setDogImage(selectedBreedUrls[0]);
  }, [selectedBreedUrls]);

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

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
  }

  function handleDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
    currentTableDataRowIndex: number,
  ) {
    const selectedSubBreed = e.target.value;
    const associatedBreed = tableRowId;
    const activeSubBreedsClone = [...activeSubBreeds];
    const activeObject = activeSubBreedsClone.find(
      (element) => element.breed == associatedBreed,
    );
    if (!activeObject) throw new Error("breed is undefined");
    activeObject.activeSubBreed = selectedSubBreed;
    setActiveSubBreeds(activeSubBreedsClone);

    const breedObject = breedData.find((element) => {
      return (
        element.breed === associatedBreed &&
        element.subBreed == selectedSubBreed
      );
    });

    if (!breedObject) throw new Error("breedObject is undefined");
    const associatedBreedRating = breedObject.rating;

    const tableDataClone = tableData.map((element) => {
      return { ...element };
    });
    (tableDataClone[currentTableDataRowIndex].rating = associatedBreedRating),
      setTableData(tableDataClone);
  }

  function handleBackClick() {
    const currentIndex = selectedBreedUrls.findIndex((element) => {
      return element == dogImage;
    });
    if (currentIndex === 0) return;
    setDogImage(selectedBreedUrls[currentIndex - 1]);
  }
  function handleForwardClick() {
    const currentIndex = selectedBreedUrls.findIndex((element) => {
      return element == dogImage;
    });

    if (currentIndex === selectedBreedUrls.length - 1) return;
    setDogImage(selectedBreedUrls[currentIndex + 1]);
  }

  return (
    <div className="rated-dogs">
      <h1 className="title">View Breed Ratings</h1>
      {dogImage && <img src={dogImage} className="Dogs-dog-image" />}
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
          theadData={["Breed", "Sub-Breed", "Rating", "Votes"]}
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
      <button onClick={handleBackClick}>Back</button>
      <button onClick={handleForwardClick}>Forward</button>
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
