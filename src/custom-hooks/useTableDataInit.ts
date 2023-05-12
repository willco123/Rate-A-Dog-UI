import { useState, useEffect } from "react";
import type { TableData, TableDataJSX, TableDataGrouped } from "../types.js";
import {
  groupTableData,
  sortTableDataGrouped,
  tableDataToJSX,
} from "../utils/format-data/table-data.js";
import { setFloatsToTwoDp } from "../utils/format-data/format-data.js";
import groupBy from "lodash/groupBy";
import { Dictionary } from "lodash";

export const useTableDataInit = ({
  filteredBreed,
  setFilteredBreed,
  getTableData,
}: {
  filteredBreed:
    | {
        breed: string;
        subBreed: string | null;
      }
    | undefined;
  setFilteredBreed: React.Dispatch<
    React.SetStateAction<
      | {
          breed: string;
          subBreed: string | null;
        }
      | undefined
    >
  >;
  getTableData: () => Promise<TableData[] | undefined>;
}) => {
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [tableDataDict, setTableDataDict] = useState<Dictionary<TableData[]>>(
    Object.create(null),
  );
  const [tableDataGrouped, setTableDataGrouped] = useState<TableDataGrouped[]>(
    [],
  );
  const [tableDataJSX, setTableDataJSX] = useState<TableDataJSX[] | []>([]);
  const [activeSubBreeds, setActiveSubBreeds] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    (async () => {
      const tableDataDb = await getTableData();
      if (!tableDataDb) return;
      const tableDataDbTwoDp = setFloatsToTwoDp(tableDataDb);

      setTableData(tableDataDbTwoDp);
    })();
  }, []);

  useEffect(() => {
    const tableDataDictionary = groupBy(tableData, "breed");
    const groupedTableData = groupTableData(tableDataDictionary);
    const sortedTableData = sortTableDataGrouped(groupedTableData);

    const initActiveSubBreeds = sortedTableData.reduce(
      (acc: Record<string, string | null>, { breed, subBreed }) => {
        acc[breed] = subBreed[0];
        return acc;
      },
      {},
    );

    setActiveSubBreeds(initActiveSubBreeds);
    setTableDataDict(tableDataDictionary);
    setTableDataGrouped(sortedTableData);
  }, [tableData]);

  useEffect(() => {
    const tableDataJSX = tableDataToJSX(
      tableDataGrouped,
      handleDropDownChange,
      handleRadioChange,
      activeSubBreeds,
    );
    setTableDataJSX(tableDataJSX);
  }, [tableDataGrouped, activeSubBreeds]);

  function clearSelection() {
    setFilteredBreed(undefined);
    const radioGroup = document.getElementsByName(
      "table-breed",
    ) as unknown as HTMLInputElement[];
    radioGroup.forEach((radio) => {
      radio.checked = false;
    });
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedBreed = event.target.value;
    const chosenSubBreed = activeSubBreeds[newSelectedBreed];
    setFilteredBreed({ breed: newSelectedBreed, subBreed: chosenSubBreed });
  }

  function handleDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
    currentTableDataRowIndex: number,
  ) {
    const selectedSubBreed = e.target.value;
    const associatedBreed = tableRowId;
    const newActiveSubBreeds = {
      ...activeSubBreeds,
      [associatedBreed]: selectedSubBreed,
    };
    setActiveSubBreeds(newActiveSubBreeds);
    if (filteredBreed && associatedBreed === filteredBreed.breed)
      setFilteredBreed({ breed: associatedBreed, subBreed: selectedSubBreed });
  }

  return {
    tableDataJSX,
    tableDataGrouped,
    setTableDataGrouped,
    clearSelection,
  };
};

export default useTableDataInit;
