import * as React from "react";
import { screen } from "@testing-library/react";
import CollapsibleSpan from "../collapsible-span/CollapsibleSpan.js";
import { setup } from "../../test-helpers/user-event-setup.js";

describe("CheckBoxHideInput", () => {
  it("Should render the element", () => {
    setup(
      <CollapsibleSpan
        WrappedComponent={<h1>A JSX Item</h1>}
        displayedText={"Some Text"}
      />,
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("Some Text")).toBeInTheDocument();
    expect(screen.getByText("A JSX Item")).toBeInTheDocument();
  });
  it("Should expand the content element when clicking text", async () => {
    const { user } = setup(
      <CollapsibleSpan
        WrappedComponent={<h1>A JSX Item</h1>}
        displayedText={"Some Text"}
      />,
    );
    const someTextSpan = screen.getByText("Some Text");
    const headingElement = screen.getByRole("heading");
    expect(headingElement).not.toHaveClass("disabled");
    await user.click(someTextSpan);
    expect(headingElement).not.toHaveClass("disabled");
  });
  it("Should expand the content element when clicking arrow", async () => {
    const { user } = setup(
      <CollapsibleSpan
        WrappedComponent={<h1>A JSX Item</h1>}
        displayedText={"Some Text"}
      />,
    );
    const rotatingArrow = screen.getByRole("button");
    const headingElement = screen.getByRole("heading");
    expect(headingElement).not.toHaveClass("active");
    await user.click(rotatingArrow);
    expect(headingElement).not.toHaveClass("active");
  });
});
