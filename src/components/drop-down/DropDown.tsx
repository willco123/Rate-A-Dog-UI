import React from "react";
import "./drop-down.css";

export type DropDownProps = {
  items: (string | null | number)[];
  isActive: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function DropDown({ items, onChange, isActive }: DropDownProps) {
  function addItemsToList(items: (string | null | number)[]) {
    const listItems = items.map((item) => {
      // console.log(item);
      if (item == null) item = " ";
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });

    return listItems;
  }
  return (
    <div className={"drop-down"}>
      {isActive && (
        <select defaultValue="empty" onChange={onChange}>
          {addItemsToList(items)}
        </select>
      )}
    </div>
  );
}
