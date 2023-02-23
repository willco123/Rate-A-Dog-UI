import React from "react";
import "./radio-hide-input.css";

export type RadioHideInputProps = {
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
        key={item}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}

//id seems to need to match value
//id cannot clash with parent td id or radio won;'t work
//might be some issue with the "htmlfor" not being able to pick
//between the two elements with same id
