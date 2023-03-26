import React from "react";
import RadioHideInput from "../components/radio-hide-input/RadioHideInput.js";
import DropDown from "../components/drop-down/DropDown.js";
import { getBreeds } from "../services/dog-ceo.js";
import {
  BreedData,
  BreedDataDb,
  TableData,
  TableDataJSX,
  Breeds,
} from "../types.js";

type HandleRadioChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
) => void;

type HandleDropDownChangeRatedDogs = (
  e: React.ChangeEvent<HTMLSelectElement>,
  tableRowId: string,
  breedDataRowIndex: number,
) => void;

type HandleDropDownChangeHomePage = (
  event: React.ChangeEvent<HTMLSelectElement>,
) => void;

type IsDropDownActive = (breedBeingRendered: string) => boolean;

export function wrapWithTdJSX(
  element: string | number | null | JSX.Element,
  id: string | number | null,
  key: string | number | null,
) {
  if (typeof id === "number") id = id.toString();
  if (typeof element == null) {
    id = "null";
    key = "null";
  }
  return <td key={key}>{element}</td>;
}

export function setAsRadioJSX(
  item: string,
  radioGroup: string,
  handleRadioChange: HandleRadioChange,
  index: number,
) {
  return (
    <RadioHideInput
      radioGroup={radioGroup}
      item={item}
      onChange={(e) => handleRadioChange(e, index)}
    />
  );
}
export function setAsDropDownJSX(
  items: (string | null | number)[],
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
  isDisabled: boolean,
) {
  return <DropDown items={items} isActive={isDisabled} onChange={onChange} />;
}

export function setFloatsToTwoDp(breedData: BreedData[]) {
  const outputArray = breedData.map((element) => {
    const ratingOutputArray = element.rating.map((rating) => {
      if (rating) rating = parseFloat(rating.toFixed(2));
      return rating;
    });
    const breedDataClone = { ...element };
    breedDataClone.rating = ratingOutputArray;
    return breedDataClone;
  });
  return outputArray;
}

export function dataDBToTableData(breedData: BreedData[]) {
  const tableData: TableData[] = breedData.map((breedObject) => {
    const { breed, subBreed, rating, numberOfRates } = breedObject;
    let firstRating = rating[0];
    
    //do this in axios req

    let firstVote = numberOfRates[0];

    const outputObject: TableData = {
      breed: breed,
      subBreed: subBreed,
      rating: firstRating,
      votes: firstVote,
    };

    return outputObject;
  });
  return tableData;
}

export function tableDataToTdJSXRatedDogs(
  tableData: TableData[],
  handleDropDownChange: HandleDropDownChangeRatedDogs,
  handleRadioChange: HandleRadioChange,
): TableDataJSX[] {
  const tableDataJSX = tableData.map((breedObject, index) => {
    const { breed, subBreed, rating, votes } = breedObject;

    const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
    const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);

    let subBreedElement: JSX.Element | string | null;
    if (subBreed.length > 1) {
      subBreedElement = setAsDropDownJSX(
        subBreed,
        (e) => handleDropDownChange(e, breed, index),
        true,
      );
    } else {
      subBreedElement = subBreed[0];
    }
    const subBreedTdJSX =
      subBreedElement == null
        ? wrapWithTdJSX(null, "null", breed + "null")
        : wrapWithTdJSX(
            subBreedElement,
            breed + " subBreed",
            breed + " subBreed",
          );

    const ratingNullToString = rating == null ? breed + "null" : breed + rating;
    const ratingTdJSX = wrapWithTdJSX(
      rating,
      "rating",
      breed + ratingNullToString,
    );

    const votesTdJSX = wrapWithTdJSX(votes, "votes", breed + "votes");
    //votes key needs to be attacehd to subBreed

    const outputObject = {
      breed: breedTdJSX,
      subBreed: subBreedTdJSX,
      rating: ratingTdJSX,
      votes: votesTdJSX,
    };

    return outputObject;
  });
  return tableDataJSX;
}

//

export function dogCeoDataToTableData(breedsList: Breeds) {
  const tableData = Object.entries(breedsList).map((element) => {
    const breed = element[0];
    const subBreed = element[1];
    const tableDataObject = {
      breed: breed,
      subBreed: subBreed,
    };
    return tableDataObject;
  });
  return tableData;
}

export function tableDataToTdJSXHomePage(
  tableData: Omit<TableData, "rating" | "votes">[],
  handleRadioChange: HandleRadioChange,
  handleDropDownChange: HandleDropDownChangeHomePage,
  isDropDownActive: IsDropDownActive,
) {
  const tableDataJSX = tableData.map((breedObject, index) => {
    const { breed, subBreed } = breedObject;
    const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
    const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);
    //seems to  not work when id's clash for input id and td id

    let subBreedElement: JSX.Element | string | null;
    if (subBreed.length > 1) {
      subBreedElement = setAsDropDownJSX(
        subBreed,
        handleDropDownChange,
        isDropDownActive(breed),
      );
    } else {
      subBreedElement = subBreed[0];
    }

    const subBreedTdJSX =
      subBreedElement == null
        ? wrapWithTdJSX(null, "null", "null")
        : wrapWithTdJSX(
            subBreedElement,
            breed + " subBreed",
            breed + " subBreed",
          );

    const outputObject = {
      breed: breedTdJSX,
      subBreed: subBreedTdJSX,
    };

    return outputObject;
  });
  return tableDataJSX;
}

type GenericTableData = {
  [key: string]: string | number | null | (string | number | null)[];
};
export type GenericTableDataJSX = { [key: string]: JSX.Element };

export function tableDataToTdJSX(tableData: GenericTableData[]) {
  const tableDataTdJSXArray: GenericTableDataJSX[] = tableData.map((row) => {
    const tableDataValues = [...Object.values(row)];
    const tableDataKeys = [...Object.keys(row)];
    const tableDataTdJSX: GenericTableDataJSX = {};
    const uniqueParent = tableDataValues[0] as string;

    tableDataValues.forEach((element, index) => {
      let tableDataValueJSX;
      if (Array.isArray(element)) element = element[0];
      if (index === 0)
        tableDataValueJSX = wrapWithTdJSX(element, element, element);
      else
        tableDataValueJSX = wrapWithTdJSX(
          element,
          element,
          element + uniqueParent,
        );
      tableDataTdJSX[tableDataKeys[index]] = tableDataValueJSX;
    });

    return tableDataTdJSX;
  });
  return tableDataTdJSXArray;
}

// export async function mimicDbDataFromFetch() {
//   //should grab data from the backend, using a hack for display purposes atm
//   const myBreeds = await getBreeds();
//   const hackyBreedsList: BreedData[] = [];

//   Object.entries(myBreeds).forEach((element: any) => {
//     const ratingArray: number[] = [];

//     if (element[1].length == 0) {
//       ratingArray.push(Math.floor(Math.random() * 10));
//     } else {
//       for (let i in element[1]) {
//         ratingArray.push(Math.floor(Math.random() * 10));
//       }
//     }

//     const breedObject: BreedData = {
//       breed: element[0],
//       subBreed: element[1],
//       rating: ratingArray,
//     };

//     hackyBreedsList.push(breedObject);
//   });
//   return hackyBreedsList;
// }
