import React, { useState, useMemo, useEffect } from "react";
import { TableProps, TableRowProps, Breed, TableBodyData } from "./types";
import Pagination from "../pagination/Pagination";
import SearchFilter from "../search-filter/SearchFilter";
import "./paged-table.css";
import CollapsibleSpan from "../collapsible-span/CollapsibleSpan";
import DropDown from "../drop-down/DropDown";

export default function PagedTable({
  theadData,
  tableData,
  setTableData,
  initialState,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [breedRating, setBreedRating] = useState<Array<null | number>>(
    new Array(tableData.length).fill(null),
  );
  const [tbodyData, setTbodyData] = useState<TableBodyData[]>();
  const itemsPerPage = 5;

  const tableDataClone = [...tableData];
  console.log("Paged Table");
  useEffect(() => {
    console.log("PagedTable UE");
    const dataOutput = tableDataClone.map((breedObject, index) => {
      const displayedRating = breedObject.rating[0];
      const breedObjectCopy = breedObject as unknown as TableBodyData;
      breedObjectCopy.rating = displayedRating;

      console.log(breedObjectCopy.rating);
      return breedObjectCopy;
    });
    setTbodyData(dataOutput);
  }, []);

  const currentTableData = useMemo(() => {
    if (!tbodyData) return null;
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return tbodyData.length
      ? tbodyData.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, tbodyData]);

  function handleDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
  ) {
    const selectedSubBreed = e.target.value;
    if (tableParentElement) {
      const rowIndex = tableData.findIndex(
        (obj) => obj.breed === tableParentElement,
      );
      console.log(tableData);
      const targetBreed = Object.values(tableData[rowIndex]);
      const subBreedArray = targetBreed[1] as string[];
      const subBreedIndex = subBreedArray.indexOf(selectedSubBreed);
      const ratingArray = targetBreed[2] as number[];
      const associatedBreedRating = ratingArray[subBreedIndex];
      const breedRatingCopy = [...breedRating];
      breedRatingCopy[rowIndex] = associatedBreedRating;
      setBreedRating(breedRatingCopy);
    }
  }

  return (
    <div className="paged-table-container">
      <CollapsibleSpan
        WrappedComponent={
          <SearchFilter
            setTableData={setTableData}
            initialState={initialState}
          />
        }
      />

      <table className="paged-table">
        <thead>
          <tr>
            {theadData.map((header) => {
              return <TableHeadItem key={header} item={header} />;
            })}
          </tr>
        </thead>
        {currentTableData && (
          <tbody>
            {currentTableData.map((item) => {
              // const rowKey = item.subBreed
              //   ? item.breed + item.subBreed
              //   : item.breed;
              const rowKey = item.breed;

              return (
                <TableRow
                  key={rowKey}
                  data={item}
                  thead={theadData}
                  onDropDownChange={handleDropDownChange}
                  setBreedRating={setBreedRating}
                  breedRating={breedRating}
                  tableParentElement={rowKey}
                />
              );
            })}
          </tbody>
        )}
      </table>

      {tbodyData && (
        <Pagination
          data={tbodyData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

// function TableRow({ data }: TableRowProps) {
//   return (
//     <tr>
//       {Object.entries(data).map((item) => {
//         const [k, v] = item;
//         return <td key={v}>{v}</td>;
//       })}
//     </tr>
//   );
// }

function TableRow({
  data,
  thead,
  onDropDownChange,
  breedRating,
  tableParentElement,
}: TableRowProps) {
  function populateRow(
    item: string | (string | null)[] | number | null,
    index: number,
  ) {
    const parentHeader = thead[index];
    if (Array.isArray(item) && item.length > 0) {
      return (
        <td id={"DropDown"} key={parentHeader}>
          {
            <DropDown
              isDisabled={true}
              onChange={onDropDownChange}
              key={parentHeader}
              items={item as string[]}
              tableParentElement={tableParentElement}
            />
          }
        </td>
      );
    }
    if (typeof item === "number") {
      return (
        <td id={"rating"} key={item}>
          {breedRating}
        </td>
      );
    }

    if (typeof item === "string") {
      return (
        <td id={item} key={item}>
          {item}
        </td>
      );
    }

    if (item === null) return null;
  }

  return (
    <tr>
      {Object.values(data).map((item, index) => {
        return populateRow(item, index);
      })}
    </tr>
  );
}
