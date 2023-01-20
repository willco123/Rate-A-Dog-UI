import React, { useState, useEffect } from "react";
import DropDown from "../drop-down/DropDown";
import RadioHideInput from "../radio-hide-input/RadioHideInput";
import { TableProps, TableRowProps, Breed } from "./types";
import "./filter-table.css";

export default function FilterTable({ theadData, tbodyData }: TableProps) {
  const [selectedBreed, setSelectedBreed] = useState<Breed[]>([null, null]);
  function isDropDownDisabled(item: [string, string[]]) {
    if (selectedBreed[0] === item[0]) return true;
    return false;
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentState = [...selectedBreed];
    currentState[0] = event.target.value;
    setSelectedBreed(currentState);
    currentState[1] = null;
    setSelectedBreed(currentState);
  }

  function handleDropDownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const currentState = [...selectedBreed];
    currentState[1] = event.target.value;

    setSelectedBreed(currentState);
  }

  return (
    <table className="filter-table">
      <thead>
        <tr>
          {theadData.map((header) => {
            return <TableHeadItem key={header} item={header} />;
          })}
        </tr>
      </thead>
      <tbody>
        {Object.entries(tbodyData).map((item) => {
          const firstColumnItem = item[0];
          return (
            <TableRow
              key={firstColumnItem}
              isDropDownDisabled={isDropDownDisabled(item)}
              onRadioChange={handleRadioChange}
              onDropDownChange={handleDropDownChange}
              data={item}
              thead={theadData}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

function TableRow({
  data,
  thead,
  onRadioChange,
  onDropDownChange,
  isDropDownDisabled,
}: TableRowProps) {
  function populateRow(item: string | (string | null)[], index: number) {
    const parentHeader = thead[index];
    if (Array.isArray(item)) {
      return item.length !== 0 ? (
        <td id={"DropDown"} key={parentHeader}>
          {
            <DropDown
              isDisabled={isDropDownDisabled}
              onChange={onDropDownChange}
              key={parentHeader}
              items={item as string[]}
            />
          }
        </td>
      ) : null;
    }
    return (
      <td id={"Radio"} key={item}>
        {
          <RadioHideInput
            key={item}
            radioGroup={parentHeader}
            item={item}
            onChange={onRadioChange}
          />
        }
      </td>
    );
  }

  return (
    <tr>
      {data.map((item, index) => {
        return populateRow(item, index);
      })}
    </tr>
  );
}
