import React from "react";
import "./radio-hide-input.css";

type RadioHideInputProps = {
  item: string;
  radioGroup: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
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
        onChange={onChange}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}
