import { useState, useEffect } from "react";
import type {
  BreedData,
  TableData,
  TableDataJSX,
  ActiveSubBreeds,
} from "../types";
import { getDbDogs } from "../services/backend";
import {
  dataDBToTableData,
  tableDataToTdJSXAllRatings,
} from "../utils/format-data/all-ratings-data.js";
import { setFloatsToTwoDp } from "../utils/format-data/format-data.js";
import type { HandleRadioChange } from "../utils/format-data/format-data.js";
import type { HandleDropDownChange } from "../utils/format-data/all-ratings-data.js";

export const useAllRatingsDataInit = (
  handleRadioChange: HandleRadioChange,
  handleDropDownChange: HandleDropDownChange,
) => {
  const [breedData, setBreedData] = useState<BreedData[] | []>([]);
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [tableDataJSX, setTableDataJSX] = useState<TableDataJSX[] | []>([]);
  const [activeSubBreeds, setActiveSubBreeds] = useState<ActiveSubBreeds[]>([]);

  useEffect(() => {
    (async () => {
      const allDogsFromDB = await getDbDogs();
      if (!allDogsFromDB) return;
      const allDogsFromDBTwoDp = setFloatsToTwoDp(allDogsFromDB);
      setBreedData(allDogsFromDBTwoDp);
    })();
  }, []);

  useEffect(() => {
    const tableData = dataDBToTableData(breedData);
    const initActiveSubBreeds: ActiveSubBreeds[] = tableData.map(
      ({ breed, subBreed }) => {
        const output = {
          breed: breed,
          activeSubBreed: subBreed[0],
        };
        return output;
      },
    );
    setActiveSubBreeds(initActiveSubBreeds);
    setTableData(tableData);
  }, [breedData]);

  useEffect(() => {
    const tableDataJSX = tableDataToTdJSXAllRatings(
      tableData,
      handleDropDownChange,
      handleRadioChange,
      activeSubBreeds,
    );
    setTableDataJSX(tableDataJSX);
  }, [tableData]);

  return {
    breedData,
    tableData,
    tableDataJSX,
    activeSubBreeds,
    setBreedData,
    setTableData,
    setTableDataJSX,
    setActiveSubBreeds,
  };
};
