// import { useState, useEffect } from "react";
// import type {
//   UserRatingData,
//   UserRatingTableData,
//   UserRatingTableDataJSX,
//   ActiveSubBreedUrls,
// } from "../types";
// import { getUserDbDogs } from "../services/backend";
// import {
//   userRatingDataToTableData,
//   tableDataToTdJSXMyRatings,
// } from "../utils/format-data/my-ratings-data.js";
// import type { HandleRadioChange } from "../utils/format-data/format-data.js";
// import type {
//   HandleSubBreedDropDownChange,
//   HandleUrlDropDownChange,
// } from "../utils/format-data/my-ratings-data.js";

// export const useMyRatingsDataInit = (
//   handleRadioChange: HandleRadioChange,
//   handleSubBreedDropDownChange: HandleSubBreedDropDownChange,
//   handleUrlDropDownChange: HandleUrlDropDownChange,
// ) => {
//   const [userRatingData, setUserRatingData] = useState<UserRatingData[]>([]);
//   const [userRatingTableData, setUserRatingTableData] = useState<
//     UserRatingTableData[]
//   >([]);
//   const [userRatingTableDataJSX, setUserRatingTableDataJSX] = useState<
//     UserRatingTableDataJSX[]
//   >([]);
//   const [activeSubBreedUrl, setActiveSubBreedUrl] = useState<
//     ActiveSubBreedUrls[]
//   >([]);

//   useEffect(() => {
//     (async () => {
//       const userRatings = await getUserDbDogs(100);
//       setUserRatingData(userRatings);
//     })();
//   }, []);

//   useEffect(() => {
//     const userRatingTableData = userRatingDataToTableData(userRatingData);
//     const initActiveSubBreedUrl: ActiveSubBreedUrls[] = userRatingTableData.map(
//       ({ breed, subBreed, urls }) => {
//         const output = {
//           breed: breed,
//           activeSubBreed: subBreed[0],
//           url: urls[0],
//         };
//         return output;
//       },
//     );
//     setActiveSubBreedUrl(initActiveSubBreedUrl);
//     setUserRatingTableData(userRatingTableData);
//   }, [userRatingData]);

//   useEffect(() => {
//     const userRatingTableDataJSX = tableDataToTdJSXMyRatings(
//       userRatingTableData,
//       handleSubBreedDropDownChange,
//       handleUrlDropDownChange,
//       handleRadioChange,
//       activeSubBreedUrl,
//     );

//     setUserRatingTableDataJSX(userRatingTableDataJSX);
//   }, [userRatingTableData]);

//   return {
//     userRatingData,
//     userRatingTableData,
//     userRatingTableDataJSX,
//     activeSubBreedUrl,
//     setUserRatingData,
//     setUserRatingTableData,
//     setUserRatingTableDataJSX,
//     setActiveSubBreedUrl,
//   };
// };
