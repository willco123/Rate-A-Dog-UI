// import * as React from "react";
// import { screen } from "@testing-library/react";
// import TableComponent from "../table-component/TableComponent.js";
// import { setup } from "../../test-helpers/user-event-setup.js";
// // import { readDataFromFile } from "../../test-helpers/create-table-data.js";

// const testData: any = [];

// beforeAll(async () => {
//   const testDataFromFile = readDataFromFile("table-data-test.txt");
//   testData.push(...testDataFromFile);
// });

// describe("TableComponent", () => {
//   it("should render with test data", () => {
//     setup(
//       <TableComponent
//         tbodyData={testData}
//         theadData={["breed, subBreed, rating"]}
//       />,
//     );
//     expect(screen.getByRole("table")).toBeInTheDocument();
//     const rows = screen.getAllByRole("row");
//     expect(rows.length).toBe(testData.length + 1);
//   });
//   it("should render without test data", () => {
//     setup(
//       <TableComponent tbodyData={[]} theadData={["breed, subBreed, rating"]} />,
//     );
//     expect(screen.getByRole("table")).toBeInTheDocument();
//     const rows = screen.getAllByRole("row");
//     expect(rows.length).toBe(1);
//   });
// });
