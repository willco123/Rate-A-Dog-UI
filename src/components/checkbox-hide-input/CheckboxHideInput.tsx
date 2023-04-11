import React from "react";
import "./checkbox-hide-input.scss";

export default function CheckboxHideInput({ item }: { item: string }) {
  return (
    <div className="checkbox-hide-input">
      <input type="checkbox" id={item} name={item} />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}
