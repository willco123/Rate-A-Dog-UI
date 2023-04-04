import React from "react";
import "./drop-down.css";

export type DropDownProps = {
  items: (string | null | number)[];
  isActive: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  // onChange: () => string | number;
  value: string | null;
};

export default function DropDown({
  items,
  onChange,
  isActive,
  value,
}: DropDownProps) {
  function addItemsToList(items: (string | null | number)[]) {
    const listItems = items.map((item) => {
      console.log(item);
      if (item == null) item = " ";
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });

    return listItems;
  }

  function setValue(item: string | null) {
    if (item === null) return "empty";
    return item;
  }
  return (
    <div className={"drop-down"}>
      {isActive && (
        <select value={setValue(value)} onChange={onChange}>
          {addItemsToList(items)}
        </select>
      )}
    </div>
  );
}
