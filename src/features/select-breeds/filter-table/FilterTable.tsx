import React, { useState } from "react";
import DropDown from "../../../components/drop-down/DropDown";
import RadioHideInput from "../radio-hide-input/RadioHideInput";
import type { TableProps, TableRowProps, BreedArray } from "./types";
import "./filter-table.css";

export default function FilterTable({ theadData, tbodyData }: TableProps) {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);

  function isDropDownDisabled(item: BreedArray) {
    const breedBeingRendered = item[0];
    if (selectedBreed === breedBeingRendered) return true;
    return false;
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
    setSelectedSubBreed(null);
  }

  function handleDropDownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedSubBreed = event.target.value;
    setSelectedSubBreed(newSelectedSubBreed);
  }

  const breedsArray: BreedArray[] = Object.entries(tbodyData);

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
        {breedsArray.map((item) => {
          const breed = item[0];
          return (
            <TableRow
              key={breed}
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
              index={1}
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
