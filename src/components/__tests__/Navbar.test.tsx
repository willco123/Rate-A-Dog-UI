import * as React from "react";
import { screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Navbar from "../navbar/Navbar.js";
import BasicApp from "../../test-helpers/BasicApp.js";
import {
  renderWithRouter,
  renderWithMemoryRouter,
  renderWithRouterAndHistory,
} from "../../test-helpers/user-event-setup.js";

describe("Navbar", () => {
  it("Correctly renders with wrapped func", () => {
    renderWithRouter(<Navbar isLoggedIn={true} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("Manually control history with Memory Router", async () => {
    const myComponents = (
      <>
        <Navbar isLoggedIn={true} />
        <BasicApp />
      </>
    );
    const { user } = renderWithMemoryRouter(myComponents, ["/"]);
    const links = screen.getAllByRole("link");
    const favourites = links[2];
    await user.click(favourites);
    expect(screen.getByText("This is the Favourites page")).toBeInTheDocument();
    const allRatings = links[1];
    await user.click(allRatings);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/dogs");
  });
  it("Using Create Memory History", async () => {
    const history = createMemoryHistory();
    const { user } = renderWithRouterAndHistory(
      <Navbar isLoggedIn={true} />,
      history,
    );
    const links = screen.getAllByRole("link");
    const favourites = links[2];

    expect(history.location.pathname).toBe("/");
    await user.click(favourites);
    expect(history.location.pathname).toBe("/favourites");
  });
  it("Expands hamburger menu", async () => {
    const { user } = renderWithRouter(<Navbar isLoggedIn={true} />);
    const hamburgerButton = screen.getByRole("button");
    await user.click(hamburgerButton);
    expect(document.body).toHaveStyle("overflow: hidden");
    await user.click(hamburgerButton);
    expect(document.body).not.toHaveStyle("overflow: hidden");
  });
});
