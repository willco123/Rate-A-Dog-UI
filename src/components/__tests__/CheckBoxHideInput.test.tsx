import * as React from "react";
import { screen } from "@testing-library/react";
import CheckBoxHideInput from "../checkbox-hide-input/CheckboxHideInput";

import { setup } from "../../test-helpers/user-event-setup";

describe("CheckBoxHideInput", () => {
  it("Should contain Checkbox", () => {
    setup(<CheckBoxHideInput item={"hey"} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText("hey")).toBeInTheDocument();
  });
  it("Should check the Checkbox", async () => {
    const { user } = setup(<CheckBoxHideInput item={"hey"} />);
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
  it("Should be unchecked", async () => {
    const { user } = setup(<CheckBoxHideInput item={"hey"} />);
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");
    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
  it("Should checked on label click", async () => {
    const { user } = setup(<CheckBoxHideInput item={"hey"} />);
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");
    const checkboxLabel: HTMLInputElement = screen.getByLabelText("hey");
    await user.click(checkboxLabel);
    expect(checkbox.checked).toEqual(true);
  });
});
