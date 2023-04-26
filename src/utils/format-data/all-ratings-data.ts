// import { setAsDropDownJSX, setAsRadioJSX, wrapWithTdJSX } from "./format-data";
// import type {
//   BreedData,
//   BreedDataGrouped,
//   TableData,
//   TableDataJSX,
//   ActiveSubBreeds,
// } from "../../types";
// import type { HandleRadioChange } from "./format-data";

// export type HandleDropDownChange = (
//   e: React.ChangeEvent<HTMLSelectElement>,
//   tableRowId: string,
//   breedDataRowIndex: number,
// ) => void;

// export function dataDBToTableData(breedData: BreedData[]): TableData[] {
//   const breedsList: string[] = [];
//   breedData.forEach((element) => {
//     breedsList.push(element.breed);
//   });
//   const setOfBreeds = [...new Set(breedsList)];
//   const breedDataGrouped: BreedDataGrouped[] = [];

//   setOfBreeds.forEach((breed) => {
//     breedDataGrouped.push({
//       breed: breed,
//       subBreed: [],
//       rating: [],
//       votes: [],
//     });
//   });
//   breedData.forEach((element) => {
//     let outputIndex = breedDataGrouped.findIndex(
//       (subElement) => element.breed === subElement.breed,
//     );

//     breedDataGrouped[outputIndex].subBreed.push(element.subBreed);
//     breedDataGrouped[outputIndex].rating.push(element.rating);
//     breedDataGrouped[outputIndex].votes.push(element.numberOfRates);
//   });
//   const tableData: TableData[] = breedDataGrouped.map(
//     ({ breed, subBreed, rating, votes }) => {
//       const firstRating = rating[0];
//       const firstVote = votes[0];

//       const outputObject = {
//         breed: breed,
//         subBreed: subBreed,
//         rating: firstRating,
//         votes: firstVote,
//       };
//       return outputObject;
//     },
//   );

//   return tableData;
// }

// export function tableDataToTdJSXAllRatings(
//   tableData: TableData[],
//   handleDropDownChange: HandleDropDownChange,
//   handleRadioChange: HandleRadioChange,
//   activeSubBreeds: ActiveSubBreeds[],
// ): TableDataJSX[] {
//   const tableDataJSX = tableData.map((breedObject, index) => {
//     const { breed, subBreed, rating, votes } = breedObject;

//     const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
//     const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);

//     const activeSubBreed = activeSubBreeds.find((element) => {
//       return element.breed === breed;
//     })?.activeSubBreed;

//     if (activeSubBreed === undefined)
//       throw new Error("activeSubBreed is undefined");

//     let subBreedElement: JSX.Element | string | null;
//     if (subBreed.length > 1) {
//       subBreedElement = setAsDropDownJSX(
//         subBreed,
//         (e) => handleDropDownChange(e, breed, index),
//         true,
//         activeSubBreed,
//       );
//     } else {
//       subBreedElement = subBreed[0];
//     }
//     const subBreedTdJSX =
//       subBreedElement == null
//         ? wrapWithTdJSX(null, "null", breed + "null")
//         : wrapWithTdJSX(
//             subBreedElement,
//             breed + " subBreed",
//             breed + " subBreed",
//           );

//     const ratingNullToString = rating == null ? breed + "null" : breed + rating;
//     const ratingTdJSX = wrapWithTdJSX(
//       rating,
//       "rating",
//       breed + ratingNullToString,
//     );

//     const votesTdJSX = wrapWithTdJSX(votes, "votes", breed + "votes");
//     //votes key needs to be attacehd to subBreed

//     const outputObject = {
//       breed: breedTdJSX,
//       subBreed: subBreedTdJSX,
//       rating: ratingTdJSX,
//       votes: votesTdJSX,
//     };

//     return outputObject;
//   });
//   return tableDataJSX;
// }
