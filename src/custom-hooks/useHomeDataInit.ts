// import { useState, useEffect } from "react";
// import type {
//   Breeds,
//   TableData,
//   TableDataJSX,
//   ActiveSubBreeds,
// } from "../types";
// import { getBreeds, getRandomDogImage } from "../services/dog-ceo.js";
// import {
//   dogCeoDataToTableData,
//   tableDataToTdJSXHomePage,
// } from "../utils/format-data/home-data.js";
// import type {
//   HandleDropDownChange,
//   IsDropDownActive,
// } from "../utils/format-data/home-data.js";
// import type { HandleRadioChange } from "../utils/format-data/format-data.js";

// export const useHomeDataInit = (
//   handleRadioChange: HandleRadioChange,
//   handleDropDownChange: HandleDropDownChange,
//   isDropDownActive: IsDropDownActive,
// ) => {
//   const [dogImage, setDogImage] = useState<string>("");
//   const [breedsList, setBreedsList] = useState<Breeds>({});
//   const [tableData, setTableData] = useState<
//     Omit<TableData, "rating" | "votes">[]
//   >([]);
//   const [tableDataJSX, setTableDataJSX] = useState<
//     Omit<TableDataJSX, "rating" | "votes">[]
//   >([]);
//   const [activeSubBreeds, setActiveSubBreeds] = useState<ActiveSubBreeds[]>([]);
//   useEffect(() => {
//     (async () => {
//       const image = await getRandomDogImage();
//       const breeds = await getBreeds();
//       if (image) setDogImage(image);
//       if (breeds) setBreedsList(breeds);
//     })();
//   }, []);

//   useEffect(() => {
//     const tableDataFromBreedsList = dogCeoDataToTableData(breedsList);
//     const initActiveSubBreeds: ActiveSubBreeds[] = tableDataFromBreedsList.map(
//       ({ breed, subBreed }) => {
//         const initSelectedSubBreed = subBreed[0] ? subBreed[0] : null;
//         const output = {
//           breed: breed,
//           activeSubBreed: initSelectedSubBreed,
//         };
//         return output;
//       },
//     );
//     setActiveSubBreeds(initActiveSubBreeds);
//     setTableData(tableDataFromBreedsList);
//   }, [breedsList]);

//   useEffect(() => {
//     const tableDataTdJSX = tableDataToTdJSXHomePage(
//       tableData,
//       handleRadioChange,
//       handleDropDownChange,
//       isDropDownActive,
//       activeSubBreeds,
//     );
//     setTableDataJSX(tableDataTdJSX);
//   }, [tableData]);

//   return {
//     breedsList,
//     tableData,
//     tableDataJSX,
//     activeSubBreeds,
//     dogImage,
//     setBreedsList,
//     setTableData,
//     setTableDataJSX,
//     setActiveSubBreeds,
//     setDogImage,
//   };
// };
