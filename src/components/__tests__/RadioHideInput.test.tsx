import * as React from "react";
import { screen } from "@testing-library/react";
import RadioHideInput from "../radio-hide-input/RadioHideInput";

import { setup } from "../../test-helpers/user-event-setup";

const onChange = jest.fn();
const radioGroup = "myGroup";
const item = "myItem";
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("RadioHideInput", () => {
  it("Should render", () => {
    setup(
      <RadioHideInput
        item={item}
        radioGroup={radioGroup}
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });
  it("Should fire change event on click", async () => {
    const item2 = "myItem2";
    const { user } = setup(
      <>
        <RadioHideInput
          item={item}
          radioGroup={radioGroup}
          onChange={onChange}
        />
        <RadioHideInput
          item={item2}
          radioGroup={radioGroup}
          onChange={onChange}
        />
      </>,
    );
    const radioItems = screen.getAllByRole("radio");
    await user.click(radioItems[0]);
    expect(onChange).toBeCalledTimes(1);
    await user.click(radioItems[0]);
    expect(onChange).toBeCalledTimes(1); //click same radio again does nothing

    await user.click(radioItems[1]);
    expect(onChange).toBeCalledTimes(2);
  });
});
