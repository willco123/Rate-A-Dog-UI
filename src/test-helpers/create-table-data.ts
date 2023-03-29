import { tableDataToTdJSX } from "../utils/format-data/format-data.js";
import { dogCeoDataToTableData } from "../utils/format-data/home-data.js";
import { getBreeds } from "../services/dog-ceo.js";
import fs from "fs";

export async function createTableData() {
  const breedsList = await getBreeds();
  if (!breedsList) return;
  const tableData = dogCeoDataToTableData(breedsList);
  const tableDataTdJSX = tableDataToTdJSX(tableData);
  return tableDataTdJSX;
}

//"table-data-test.txt"
export function writeDataToFile(
  tableData: { [key: string]: any },
  filename: string,
) {
  fs.writeFileSync(filename, JSON.stringify(tableData, null, 2));
}

export function readDataFromFile(filename: string) {
  const testDataString = fs.readFileSync(filename, {
    encoding: "utf8",
  });
  const testData = JSON.parse(testDataString);
  const tableDataTdJSX = tableDataToTdJSX(testData);
  return tableDataTdJSX;
}

async function writeBreedsToFile() {
  const breedsList = await getBreeds();
  if (!breedsList) return;
  const tableData = dogCeoDataToTableData(breedsList);
  writeDataToFile(tableData, "table-data-test.txt");
}
