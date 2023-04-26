// import React from "react";
// import RadioHideInput from "../../components/radio-hide-input/RadioHideInput.js";
// import DropDown from "../../components/drop-down/DropDown.js";
// import { BreedData } from "../../types.js";

// export type HandleRadioChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   index: number,
// ) => void;

// export function wrapWithTdJSX(
//   element: string | number | null | JSX.Element,
//   id: string | number | null,
//   key: string | number | null,
// ) {
//   if (typeof id === "number") id = id.toString();
//   if (typeof element == null) {
//     id = "null";
//     key = "null";
//   }
//   return <td key={key}>{element}</td>;
// }

// export function setAsRadioJSX(
//   item: string,
//   radioGroup: string,
//   handleRadioChange: HandleRadioChange,
//   index: number,
// ) {
//   return (
//     <RadioHideInput
//       radioGroup={radioGroup}
//       item={item}
//       onChange={(e) => handleRadioChange(e, index)}
//     />
//   );
// }
// export function setAsDropDownJSX(
//   items: (string | null | number)[],
//   onChange: React.ChangeEventHandler<HTMLSelectElement>,
//   // onChange: () => string | number,
//   isDisabled: boolean,
//   activeSubBreed: string | null,
// ) {
//   return (
//     <DropDown
//       items={items}
//       isActive={isDisabled}
//       onChange={onChange}
//       value={activeSubBreed}
//     />
//   );
// }

// export function setFloatsToTwoDp(breedData: BreedData[]) {
//   const outputArray = breedData.map((element) => {
//     if (element.rating) element.rating = parseFloat(element.rating.toFixed(2));
//     return element;
//   });
//   return outputArray;
// }

// type GenericTableData = {
//   [key: string]: string | number | null | (string | number | null)[];
// };
// export type GenericTableDataJSX = { [key: string]: JSX.Element };

// export function tableDataToTdJSX(tableData: GenericTableData[]) {
//   const tableDataTdJSXArray: GenericTableDataJSX[] = tableData.map((row) => {
//     const tableDataValues = [...Object.values(row)];
//     const tableDataKeys = [...Object.keys(row)];
//     const tableDataTdJSX: GenericTableDataJSX = {};
//     const uniqueParent = tableDataValues[0] as string;

//     tableDataValues.forEach((element, index) => {
//       let tableDataValueJSX;
//       if (Array.isArray(element)) element = element[0];
//       if (index === 0)
//         tableDataValueJSX = wrapWithTdJSX(element, element, element);
//       else
//         tableDataValueJSX = wrapWithTdJSX(
//           element,
//           element,
//           element + uniqueParent,
//         );
//       tableDataTdJSX[tableDataKeys[index]] = tableDataValueJSX;
//     });

//     return tableDataTdJSX;
//   });
//   return tableDataTdJSXArray;
// }

// // export async function mimicDbDataFromFetch() {
// //   //should grab data from the backend, using a hack for display purposes atm
// //   const myBreeds = await getBreeds();
// //   const hackyBreedsList: BreedData[] = [];

// //   Object.entries(myBreeds).forEach((element: any) => {
// //     const ratingArray: number[] = [];

// //     if (element[1].length == 0) {
// //       ratingArray.push(Math.floor(Math.random() * 10));
// //     } else {
// //       for (let i in element[1]) {
// //         ratingArray.push(Math.floor(Math.random() * 10));
// //       }
// //     }

// //     const breedObject: BreedData = {
// //       breed: element[0],
// //       subBreed: element[1],
// //       rating: ratingArray,
// //     };

// //     hackyBreedsList.push(breedObject);
// //   });
// //   return hackyBreedsList;
// // }
