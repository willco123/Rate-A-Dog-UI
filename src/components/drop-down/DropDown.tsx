import React from "react";
import "./drop-down.css";

type DropDownProps = {
  items: (string | null | number)[];
  isDisabled: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function DropDown({
  items,
  onChange,
  isDisabled,
}: DropDownProps) {
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
    <td className="drop-down" key={123}>
      {isDisabled && (
        <select defaultValue="empty" onChange={onChange}>
          {addItemsToList(items)}
        </select>
      )}
    </td>
  );
}
