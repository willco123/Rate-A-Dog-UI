import React from "react";
import RadioHideInput from "../components/radio-hide-input/RadioHideInput";
import DropDown from "../components/drop-down/DropDown";
import { BreedData, TableData, TableDataJSX, Breeds } from "../types";
import { getBreeds } from "../services/dog-ceo";

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
  id: string,
  key: string | number,
) {
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

export function dataDBToTableData(breedData: BreedData[]) {
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

export function tableDataToTdJSXRatedDogs(
  tableData: TableData[],
  handleDropDownChange: HandleDropDownChangeRatedDogs,
): TableDataJSX[] {
  const tableDataJSX = tableData.map((breedObject, index) => {
    const { breed, subBreed, rating } = breedObject;

    const breedTdJSX = wrapWithTdJSX(breed, breed, breed);

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
        ? wrapWithTdJSX(null, "null", "null")
        : wrapWithTdJSX(
            subBreedElement,
            breed + " subBreed",
            breed + " subBreed",
          );

    const ratingNullToString = rating == null ? "null" : rating;
    const ratingTdJSX = wrapWithTdJSX(rating, "rating", ratingNullToString);
    const outputObject = {
      breed: breedTdJSX,
      subBreed: subBreedTdJSX,
      rating: ratingTdJSX,
    };

    return outputObject;
  });
  return tableDataJSX;
}

export async function mimicDbDataFromFetch() {
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
  return hackyBreedsList;
}

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
  tableData: Omit<TableData, "rating">[],
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
