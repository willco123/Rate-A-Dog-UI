import * as React from "react";
import { screen } from "@testing-library/react";
import TableComponent from "../table-component/TableComponent";
import fs from "fs";
import { setup } from "../../test-helpers/user-event-setup";
import parse from "html-react-parser";

const testDataString = fs.readFileSync("src/test-helpers/table-data-jsx.txt", {
  encoding: "utf8",
});

export type TestDataJSX = {
  breed: JSX.Element;
  subBreed: JSX.Element;
  rating: JSX.Element;
};

export type TestData = {
  breed: string;
  subBreed: string | null;
  rating: string | null;
};

const testDataJSON = JSON.parse(testDataString);
const testDataJSONJSX: TestDataJSX[] = testDataJSON.map((row: TestData) => {
  const { breed, subBreed, rating } = row;
  const breedActualJSX = parse(breed);
  const subBreedActualJSX = subBreed == null ? null : parse(subBreed);
  const ratingActualJSX = rating == null ? null : parse(rating);

  const outputObj = {
    breed: breedActualJSX,
    subBreed: subBreedActualJSX,
    rating: ratingActualJSX,
  };
  return outputObj;
});

describe("CheckBoxHideInput", () => {
  it("Should contain Checkbox", () => {
    setup(
      <TableComponent
        tbodyData={testDataJSONJSX}
        theadData={["breed, subBreed, rating"]}
      />,
    );
    screen.debug();
  });
});
