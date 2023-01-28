import React from "react";
import "./drop-down.css";

type DropDownProps = {
  items: string[];
  isDisabled: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
    index: number,
  ) => void;
  tableParentElement?: string;
  index: number;
};

export default function DropDown({
  items,
  onChange,
  isDisabled,
  tableParentElement,
  index,
}: DropDownProps) {
  function addItemsToList(items: string[]) {
    const listItems = items.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));

    return listItems;
  }
  return (
    <div className="drop-down">
      {isDisabled && (
        <select
          defaultValue="empty"
          onChange={(e) => onChange(e, tableParentElement, index)}
        >
          {addItemsToList(items)}
        </select>
      )}
    </div>
  );
}
