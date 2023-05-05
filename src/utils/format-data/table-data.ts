import { setAsDropDownJSX, setAsRadioJSX, wrapWithTdJSX } from "./format-data";
import type {
  TableData,
  TableDataGrouped,
  TableDataJSX,
  ActiveSubBreeds,
  HandleDropDownChange,
} from "../../types";
import type { HandleRadioChange } from "./format-data";
import _ from "lodash";

export function groupTableData(tableData: _.Dictionary<TableData[]> | []) {
  const tableDataGrouped = Object.values(tableData).map((el) => {
    const output: TableDataGrouped = {
      breed: el[0].breed,
      subBreed: [],
      averageRating: [],
      numberOfRates: [],
    };
    el.forEach((subEl) => {
      output.subBreed.push(subEl.subBreed);
      output.averageRating.push(subEl.averageRating);
      output.numberOfRates.push(subEl.numberOfRates);
    });
    return output;
  });

  return tableDataGrouped;
}

export function sortTableDataGrouped(
  tableDataGrouped: TableDataGrouped[],
  sortOrder: "asc" | "desc" = "asc",
): TableDataGrouped[] {
  const sortedByBreed = [...tableDataGrouped].sort((a, b) => {
    if (sortOrder === "asc" ? a.breed < b.breed : a.breed > b.breed) {
      return -1;
    } else {
      return 1;
    }
  });

  const sorted = sortedByBreed.map((el) => {
    const indices = el.subBreed
      .map((_, i) => i)
      .sort((a, b) => {
        const subBreedA = el.subBreed[a] || "";
        const subBreedB = el.subBreed[b] || "";
        return subBreedA.localeCompare(subBreedB);
      });

    el.subBreed = indices.map((i) => el.subBreed[i]);
    el.averageRating = indices.map((i) => el.averageRating[i] || null);
    el.numberOfRates = indices.map((i) => el.numberOfRates[i]);

    return el;
  });
  return sorted;
}

export function tableDataToJSX(
  tableDataGrouped: TableDataGrouped[],
  handleDropDownChange: HandleDropDownChange,
  handleRadioChange: HandleRadioChange,
  activeSubBreeds: Record<string, string | null>,
): TableDataJSX[] {
  const tableDataJSX = tableDataGrouped.map((breedObject, index) => {
    const { breed, subBreed, averageRating, numberOfRates } = breedObject;

    const breedJSX = setAsRadioJSX(breed, "breed", handleRadioChange, index);
    const breedTdJSX = wrapWithTdJSX(breedJSX, breed, breed);
    const activeSubBreed = activeSubBreeds[breed];
    // console.log(activeSubBreed, breed, subBreed);
    let activeIndex = subBreed.findIndex((el) => {
      return el === activeSubBreed;
    });

    if (activeIndex === -1) activeIndex = 0;

    let subBreedElement: JSX.Element | string | null;
    if (subBreed.length > 1) {
      subBreedElement = setAsDropDownJSX(
        subBreed,
        (e) => handleDropDownChange(e, breed, index),
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

    const ratingNullToString =
      averageRating[activeIndex] == null
        ? breed + "null"
        : breed + averageRating[activeIndex];

    const ratingTdJSX = wrapWithTdJSX(
      averageRating[activeIndex],
      "rating",
      breed + ratingNullToString,
    );

    const numberOfRatesTdJSX = wrapWithTdJSX(
      numberOfRates[activeIndex],
      "numberOfRates",
      breed + "numberOfRates",
    );
    //votes key needs to be attacehd to subBreed

    const outputObject = {
      breed: breedTdJSX,
      subBreed: subBreedTdJSX,
      averageRating: ratingTdJSX,
      numberOfRates: numberOfRatesTdJSX,
    };

    return outputObject;
  });
  return tableDataJSX;
}
