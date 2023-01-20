import { table } from "console";
import React, { useState, useEffect } from "react";
import "./drop-down.css";

type DropDownProps = {
  items: string[];
  isDisabled: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
  ) => void;
  tableParentElement?: string;
};

export default function DropDown({
  items,
  onChange,
  isDisabled,
  tableParentElement,
}: DropDownProps) {
  function addItemsToList(items: string[]) {
    const listItems = items.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
    listItems.unshift(<option value={"empty"} key={"empty"} label=""></option>);
    return listItems;
  }
  return (
    <div className="drop-down">
      {isDisabled && (
        <select
          defaultValue="empty"
          // disabled={isDisabled}
          onChange={(e) => onChange(e, tableParentElement)}
        >
          {addItemsToList(items)}
        </select>
      )}
    </div>
  );
}

//Find sub-breed in assosicated breeds tbodydata
//Get its index
//Get associated rating using index
//set state
