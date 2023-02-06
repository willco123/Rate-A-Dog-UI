import React, { useEffect, useState, useMemo } from "react";
import "./rated-dogs.css";
import TableComponent from "../../components/table-component/TableComponent";
import { getBreeds } from "../../services/dog-ceo";
import CollapsibleSpan from "../../components/collapsible-span/CollapsibleSpan";
import SearchFilter from "../../components/search-filter/SearchFilter";
import Pagination from "../../components/pagination/Pagination";
import type { BreedData, TableData, TableDataJSX } from "../../types";
import DropDown from "../../components/drop-down/DropDown";
import filterArrayOfObjects from "../../utils/filter-array";

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
      const myBreeds = await getBreeds();
      const hackyBreedsList: BreedData[] = [];

      Object.entries(myBreeds).forEach((element: any) => {
        const ratingArray: number[] = [];

        if (element[1].length == 0) {
          ratingArray.push(Math.floor(Math.random() * 10));
        } else {
          for (let i in element[1]) {
            ratingArray.push(Math.floor(Math.random() * 10));
          }
        }

        const breedObject: BreedData = {
          breed: element[0],
          subBreed: element[1],
          rating: ratingArray,
        };

        hackyBreedsList.push(breedObject);
      });
      setBreedData(hackyBreedsList);
    })();
  }, []);

  useEffect(() => {
    const tableData = breedDataToTableData(breedData);
    setTableData(tableData);
  }, [breedData]);

  useEffect(() => {
    const tableDataJSX = tableDataToJSX(tableData);
    setTableDataJSX(tableDataJSX);
  }, [tableData]);

  function breedDataToTableData(breedData: BreedData[]) {
    const tableData: TableData[] = breedData.map((breedObject) => {
      const { breed, subBreed, rating } = breedObject;
      const firstRating = rating[0];

      const outputObject: TableData = {
        breed: breed,
        subBreed: subBreed,
        rating: firstRating,
      };

      return outputObject;
    });
    return tableData;
  }

  function tableDataToJSX(tableData: TableData[]) {
    const tableDataJSX: TableDataJSX[] = tableData.map((breedObject, index) => {
      const { breed, rating } = breedObject;
      const ratingNullToString = rating == null ? "null" : rating;

      const breedJSX = setElementAsJSX(breed, breed, breed);
      const subBreedJSX = setSubBreedAsJSX(breedObject, index);
      const ratingJSX = setElementAsJSX(rating, "rating", ratingNullToString);

      const outputObject: TableDataJSX = {
        breed: breedJSX,
        subBreed: subBreedJSX,
        rating: ratingJSX,
      };

      return outputObject;
    });
    return tableDataJSX;
  }

  function setElementAsJSX(
    element: string | number | null,
    id: string,
    key: string | number,
  ) {
    return (
      <td id={id} key={key}>
        {element}
      </td>
    );
  }

  function setSubBreedAsJSX(breedObject: TableData, index: number) {
    const subBreedArray = breedObject.subBreed;
    const tableParentElement = breedObject.breed;
    let outputSubBreed: JSX.Element;

    if (subBreedArray.length > 1) {
      outputSubBreed = (
        <DropDown
          items={subBreedArray}
          onChange={(e) => handleDropDownChange(e, tableParentElement, index)}
          isDisabled={true}
          key={tableParentElement + "subBreed"}
        />
      );
    } else {
      const singleElement = breedObject.subBreed[0];
      outputSubBreed =
        singleElement == null
          ? setElementAsJSX(singleElement, "null", "null")
          : setElementAsJSX(singleElement, singleElement, singleElement);
    }
    return outputSubBreed;
  }

  function filterTable(filterValue: string, breedData: BreedData[]) {
    const filteredArray = filterArrayOfObjects<BreedData>(
      breedData,
      filterValue,
    );
    const filteredTableData: TableData[] = breedDataToTableData(filteredArray);
    filteredArray.length != 0
      ? setTableData(filteredTableData)
      : reInitTableData(breedData);
    setCurrentPage(1);
  }

  function reInitTableData(breedData: BreedData[]) {
    const tableData = breedDataToTableData(breedData);
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
