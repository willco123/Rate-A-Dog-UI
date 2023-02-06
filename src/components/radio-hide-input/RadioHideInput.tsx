import React from "react";
import "./radio-hide-input.css";

type RadioHideInputProps = {
  item: string;
  radioGroup: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioHideInput({
  item,
  radioGroup,
  onChange,
}: RadioHideInputProps) {
  return (
    <div className="radio-hide-input">
      <input
        type="radio"
        value={item}
        id={item}
        name={radioGroup}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}
