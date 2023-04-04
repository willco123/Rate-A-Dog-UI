import { setAsDropDownJSX, setAsRadioJSX, wrapWithTdJSX } from "./format-data";
import {
  UserRatingData,
  UserRatingTableData,
  UserRatingTableDataJSX,
  UserRatingDataGrouped,
  ActiveSubBreedUrls,
} from "../../types";
import type { HandleRadioChange } from "./format-data";

export type HandleSubBreedDropDownChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  tableRowId: string,
  breedDataRowIndex: number,
) => void;

export type HandleUrlDropDownChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  tableRowId: string,
  breedDataRowIndex: number,
) => void;

export function userRatingDataToTableData(
  userRatingData: UserRatingData[],
): UserRatingTableData[] {
  const breedsList: string[] = [];
  userRatingData.forEach((element) => {
    breedsList.push(element.breed);
  });

  const setOfBreeds = [...new Set(breedsList)];
  console.log(setOfBreeds);
  const UserRatingDataGrouped: UserRatingDataGrouped[] = [];

  setOfBreeds.forEach((breed) => {
    UserRatingDataGrouped.push({
      breed: breed,
      subBreed: [],
      urls: [],
      urlRatings: [],
    });
  });
  userRatingData.forEach((element) => {
    let outputIndex = UserRatingDataGrouped.findIndex(
      (subElement) => element.breed === subElement.breed,
    );
    const urlRatings = element.urlRatings.map((urlRating) => urlRating[0]);

    const urls = element.urlRatings.map((urlRatings) => urlRatings[1]);

    UserRatingDataGrouped[outputIndex].subBreed.push(element.subBreed);
    UserRatingDataGrouped[outputIndex].urls.push(urls);
    UserRatingDataGrouped[outputIndex].urlRatings.push(
      urlRatings as (number | null)[],
    );
  });
  const userRatingTableData: UserRatingTableData[] = UserRatingDataGrouped.map(
    ({ breed, subBreed, urlRatings, urls }) => {
      const firstRating = urlRatings[0][0]; //urlRatings[0][0] is the first rating of the first url of the first subBreed
      const firstUrlArray = urls[0];
      console.log("here");
      console.log(subBreed);
      console.log(firstUrlArray);
      const outputObject = {
        breed: breed,
        subBreed: subBreed,
        urls: firstUrlArray,
        urlRating: firstRating,
      };
      return outputObject;
    },
  );

  return userRatingTableData;
}

export function tableDataToTdJSXMyRatings(
  userRatingTableData: UserRatingTableData[],
  handleSubBreedDropDownChange: HandleSubBreedDropDownChange,
  handlUrlDropDownChange: HandleUrlDropDownChange,
  handleRadioChange: HandleRadioChange,
  activeSubBreedUrls: ActiveSubBreedUrls[],
): UserRatingTableDataJSX[] {
  const userRatingTableDataJSX = userRatingTableData.map(
    (breedObject, index) => {
      const { breed, subBreed, urlRating, urls } = breedObject;
      const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
      const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);
      const targetSubBreedUrls = activeSubBreedUrls.find((element) => {
        return element.breed === breed;
      });

      if (targetSubBreedUrls === undefined)
        throw new Error("activeSubBreed is undefined");

      const activeSubBreed = targetSubBreedUrls.activeSubBreed;
      const activeUrl = targetSubBreedUrls.url;

      let subBreedElement: JSX.Element | string | null;
      if (subBreed.length > 1) {
        subBreedElement = setAsDropDownJSX(
          subBreed,
          (e) => handleSubBreedDropDownChange(e, breed, index),
          true,
          activeSubBreed,
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

      let urlsElement: JSX.Element | string | null;
      if (urls.length > 1) {
        urlsElement = setAsDropDownJSX(
          urls,
          (e) => handlUrlDropDownChange(e, breed, index),
          true,
          activeUrl,
        );
      } else {
        urlsElement = urls[0];
      }
      const urlsTdJSX =
        urlsElement == null
          ? wrapWithTdJSX(null, "null", breed + "null")
          : wrapWithTdJSX(urlsElement, breed + " urls", breed + " urls");

      const urlRatingTdJSX = wrapWithTdJSX(
        urlRating,
        "rating",
        breed + "rating",
      );

      const outputObject = {
        breed: breedTdJSX,
        subBreed: subBreedTdJSX,
        urls: urlsTdJSX,
        urlRating: urlRatingTdJSX,
      };

      return outputObject;
    },
  );
  return userRatingTableDataJSX;
}
