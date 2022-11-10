import React, { useState, useEffect } from "react";
import "./drop-down.css";

type DropDownProps = {
  items: string[];
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function DropDown({
  items,
  onChange,
  isDisabled,
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
          onChange={(e) => onChange(e)}
        >
          {addItemsToList(items)}
        </select>
      )}
    </div>
  );
}
