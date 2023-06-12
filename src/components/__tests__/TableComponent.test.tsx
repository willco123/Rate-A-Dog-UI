import * as React from "react";
import { screen } from "@testing-library/react";
import TableComponent from "../table-component/TableComponent.js";
import { setup } from "../../test-helpers/user-event-setup.js";

const testData: any = [];

describe("TableComponent", () => {
  it("should render with test data", () => {
    setup(
      <TableComponent
        tbodyData={testData}
        theadData={["breed, subBreed, rating"]}
      />,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(testData.length + 1);
  });
  it("should render without test data", () => {
    setup(
      <TableComponent tbodyData={[]} theadData={["breed, subBreed, rating"]} />,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1);
  });
});
