import React, { useEffect, useState, useMemo } from "react";
import "./rated-dogs.css";
import PagedTable from "../common/paged-table/PagedTable";
import getBreeds from "../../services/get-breeds";
import CollapsibleSpan from "../common/collapsible-span/CollapsibleSpan";
import SearchFilter from "../common/search-filter/SearchFilter";
import Pagination from "../common/pagination/Pagination";

export default function RatedDogs() {
  const [breedData, setBreedData] = useState<BreedData[] | []>([]);
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [initialTableData, setInitialTableData] = useState<TableData[] | []>(
    [],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 5;

  const currentTableData = useMemo(() => {
    if (!tableData) return [];
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return tableData.length
      ? tableData.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, tableData]);

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
    const breedDataClone = breedData.map((element) => {
      return { ...element };
    });

    const dataOutput = breedDataClone.map((breedObject, index) => {
      const ratingtoBeDisplayed = breedObject.rating[0];
      const breedObjectCopy = breedObject as unknown as TableData;
      breedObjectCopy.rating = ratingtoBeDisplayed;
      return breedObjectCopy;
    });

    setTableData(dataOutput);
    setInitialTableData(dataOutput);
  }, [breedData]);

  function handleDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
  ) {
    const selectedSubBreed = e.target.value;
    if (tableParentElement) {
      const rowIndex = breedData.findIndex(
        (obj) => obj.breed === tableParentElement,
      );
      const targetBreed = Object.values(breedData[rowIndex]);
      const subBreedArray = targetBreed[1] as string[];
      const subBreedIndex = subBreedArray.indexOf(selectedSubBreed);
      const ratingArray = targetBreed[2] as number[];
      const associatedBreedRating = ratingArray[subBreedIndex];
      const tableDataClone = tableData.map((element) => {
        return { ...element };
      });
      tableDataClone[rowIndex].rating = associatedBreedRating;
      setTableData(tableDataClone);
    }
  }

  return (
    <>
      <div className="title">Rated Dogs</div>
      <div className="title">List all dogs</div>
      <div className="title">And their ratings</div>
      <div className="title">Have a filter</div>
      <div className="title">For users ratings</div>
      <div className="title">and other filters</div>
      <CollapsibleSpan
        WrappedComponent={
          <SearchFilter
            setTableBodyData={setTableData}
            initialState={initialTableData}
          />
        }
      />
      <PagedTable
        handleDropDownChange={handleDropDownChange}
        key={"PagedTable"}
        theadData={["Breed", "Sub-Breed", "Rating"]}
        tbodyData={currentTableData}
      />

      {tableData && (
        <Pagination
          data={tableData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </>
  );
}

type BreedData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number[];
};

export type TableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
};
