// import React, { useEffect, useState, useMemo } from "react";
// import classnames from "classnames";
// import "./all-ratings.scss";
// import TableComponent from "../../components/table-component/TableComponent.js";
// import CollapsibleSpan from "../../components/collapsible-span/CollapsibleSpan.js";
// import SearchFilter from "../../components/search-filter/SearchFilter.js";
// import Pagination from "../../components/pagination/Pagination.js";
// import filterArrayOfObjects from "../../utils/filter-array.js";
// import { dataDBToTableData } from "../../utils/format-data/all-ratings-data.js";
// import type { BreedData, TableData } from "../../types.js";
// import { useAllRatingsDataInit } from "../../custom-hooks/useAllRatingsDataInit";

// export default function AllRatings() {
//   const [dogImage, setDogImage] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
//   const [selectedBreedUrls, setSelectedBreedUrls] = useState<(string | null)[]>(
//     [null],
//   );
//   const [isLeftArrow, setIsLeftArrow] = useState<boolean>(false);
//   const [isRightArrow, setIsRightArrow] = useState<boolean>(true);
//   const itemsPerPage = 5;

//   const {
//     breedData,
//     tableDataJSX,
//     activeSubBreeds,
//     tableData,
//     setTableData,
//     setActiveSubBreeds,
//   } = useAllRatingsDataInit(handleRadioChange, handleDropDownChange);

//   const currentTableDataJSX = useMemo(() => {
//     if (!tableDataJSX) return [];
//     const firstPageIndex = (currentPage - 1) * itemsPerPage;
//     const lastPageIndex = firstPageIndex + itemsPerPage;
//     return tableDataJSX.length
//       ? tableDataJSX.slice(firstPageIndex, lastPageIndex)
//       : [];
//   }, [currentPage, tableDataJSX]);

//   useEffect(() => {
//     if (selectedBreed === null) return;

//     const associatedSubBreed = activeSubBreeds.find((element) => {
//       return element.breed === selectedBreed;
//     });

//     const breedObject = breedData.find((element) => {
//       return (
//         element.breed === selectedBreed &&
//         element.subBreed == associatedSubBreed?.activeSubBreed
//       );
//     });
//     if (!breedObject) throw new Error("breedObject is undefined");
//     setSelectedBreedUrls(breedObject.url);
//   }, [selectedBreed, activeSubBreeds]);

//   useEffect(() => {
//     setDogImage(selectedBreedUrls[0]);
//     if (selectedBreedUrls.length === 1) {
//       setIsLeftArrow(false);
//       setIsRightArrow(false);
//     } else {
//       setIsLeftArrow(false);
//       setIsRightArrow(true);
//     }
//   }, [selectedBreedUrls]);

//   function filterTable(filterValue: string, breedData: BreedData[]) {
//     const filteredArray = filterArrayOfObjects<BreedData>(
//       breedData,
//       filterValue,
//     );
//     const filteredTableData: TableData[] = dataDBToTableData(filteredArray);
//     filteredArray.length != 0
//       ? setTableData(filteredTableData)
//       : reInitTableData(breedData);
//     setCurrentPage(1);
//   }

//   function reInitTableData(breedData: BreedData[]) {
//     const tableData = dataDBToTableData(breedData);
//     setTableData(tableData);
//   }

//   function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const newSelectedBreed = event.target.value;
//     setSelectedBreed(newSelectedBreed);
//   }

//   function handleDropDownChange(
//     e: React.ChangeEvent<HTMLSelectElement>,
//     tableRowId: string,
//     currentTableDataRowIndex: number,
//   ) {
//     const selectedSubBreed = e.target.value;
//     const associatedBreed = tableRowId;
//     const activeSubBreedsClone = [...activeSubBreeds];
//     const activeObject = activeSubBreedsClone.find(
//       (element) => element.breed == associatedBreed,
//     );
//     if (!activeObject) throw new Error("breed is undefined");
//     activeObject.activeSubBreed = selectedSubBreed;
//     setActiveSubBreeds(activeSubBreedsClone);

//     const breedObject = breedData.find((element) => {
//       return (
//         element.breed === associatedBreed &&
//         element.subBreed == selectedSubBreed
//       );
//     });

//     if (!breedObject) throw new Error("breedObject is undefined");
//     const associatedBreedRating = breedObject.rating;

//     const tableDataClone = tableData.map((element) => {
//       return { ...element };
//     });
//     (tableDataClone[currentTableDataRowIndex].rating = associatedBreedRating),
//       setTableData(tableDataClone);
//   }

//   function handleBackClick() {
//     const currentIndex = selectedBreedUrls.findIndex((element) => {
//       return element == dogImage;
//     });
//     if (currentIndex - 1 === 0) setIsLeftArrow(false);
//     if (currentIndex === selectedBreedUrls.length - 1) setIsRightArrow(true);
//     setDogImage(selectedBreedUrls[currentIndex - 1]);
//   }
//   function handleForwardClick() {
//     const currentIndex = selectedBreedUrls.findIndex((element) => {
//       return element == dogImage;
//     });
//     if (currentIndex + 1 === 1) setIsLeftArrow(true);

//     if (currentIndex === selectedBreedUrls.length - 2) setIsRightArrow(false);

//     setDogImage(selectedBreedUrls[currentIndex + 1]);
//   }

//   return (
//     <div className="all-ratings">
//       <h1 className="title">All Ratings</h1>
//       {selectedBreed && (
//         <div className="image-buttons-container">
//           <div className="button-left-container">
//             <button
//               onClick={handleBackClick}
//               className={classnames("button-left", {
//                 disabled: !isLeftArrow,
//               })}
//             />
//           </div>
//           {dogImage && (
//             <div className="image-container">
//               <img src={dogImage} className="dog-image" />
//             </div>
//           )}
//           <div className="button-right-container">
//             <button
//               onClick={handleForwardClick}
//               className={classnames("button-right", {
//                 disabled: !isRightArrow,
//               })}
//             />
//           </div>
//         </div>
//       )}
//       <CollapsibleSpan
//         WrappedComponent={
//           <SearchFilter
//             filterTable={filterTable}
//             breedData={breedData}
//             setCurrentPage={setCurrentPage}
//             reInitTableData={reInitTableData}
//           />
//         }
//         displayedText={"Filter Breed"}
//       />
//       <div className="table-container">
//         <TableComponent
//           key={"table-component"}
//           theadData={["Breed", "Sub-Breed", "Rating", "Votes"]}
//           tbodyData={currentTableDataJSX}
//         />
//       </div>
//       {tableData && (
//         <Pagination
//           dataLength={tableData.length}
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           onPageChange={(page: number) => setCurrentPage(page)}
//         />
//       )}
//     </div>
//   );
// }

// // onChange={(e) =>
// //   handleDropDownChange(
// //     e,
// //     tableParentElement,
// //     currentTableDataRowIndex,
// //   )
// // }

// //Test if

// // function initialiseRating(breedObject: BreedData) {
// //   const ratingtoBeDisplayed = breedObject.rating[0];
// //   const breedObjectCopy = breedObject as unknown as IntermittentTableData;
// //   breedObjectCopy.rating = ratingtoBeDisplayed;
// //   return breedObjectCopy;
// // }

// //tableDataClone[currentTableDataRowIndex] is undefined
// //tableData is empty for some reason
