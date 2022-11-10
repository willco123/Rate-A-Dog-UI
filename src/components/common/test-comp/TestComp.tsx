import React from "react";
import "../drop-down/drop-down.css";
export default function TestComp({ items }: { items: string[] }) {
  function addItemsToList(items: string[]) {
    const listItems = items.map((item) => (
      <option value={item} key={item}>
        {item}
      </option>
    ));
    listItems.unshift(<option value={"empty"} key={"empty"} label=""></option>);
    return listItems;
  }
  return (
    <div className="drop-down">
      <select>{addItemsToList(items)}</select>
    </div>
  );
}

//value = "parent" table cell
