import * as React from "react";
import { screen } from "@testing-library/react";
import FiveStarRating from "../five-star-rating/FiveStarRating";
import { setup } from "../../test-helpers/user-event-setup";

const onChange = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("FiveStarRating", () => {
  it("Correctly check a star on click", async () => {
    const { user } = setup(<FiveStarRating onChange={onChange} />);

    const stars = screen.getAllByRole("radio");
    const firstStar = stars[0];
    const secondStar = stars[1];

    await user.click(firstStar);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(firstStar).toBeChecked();
    expect(secondStar).not.toBeChecked();

    await user.click(secondStar);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(firstStar).not.toBeChecked();
    expect(secondStar).toBeChecked();
  });
  // it("Check if color changes on hover", async () => {
  //   const { user } = setup(<FiveStarRating onChange={onChange} />);
  //   const firstStarLabel = screen.getByLabelText("input-1");
  //   await user.hover(firstStarLabel);
  //   const myEle = document.querySelector('[aria-label="input-1"]')!;
  //   const hoverColor = getComputedStyle(myEle, ":before").getPropertyValue(
  //     "font-family",
  //   );

  //   console.dir(hoverColor);

  //   expect(firstStarLabel).toHaveStyle({
  //     "::before": {
  //       color: "orange",
  //     },
  //   });
  // });
  // //support for pseudo elements might not exist yet
});
