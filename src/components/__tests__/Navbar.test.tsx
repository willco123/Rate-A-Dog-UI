import * as React from "react";
import { screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Navbar from "../navbar/Navbar.js";
import BasicApp, { resizeScreenSize } from "../../test-helpers/BasicApp.js";
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
    const sorted = links[2];
    await user.click(sorted);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/sorted");
    const random = links[1];
    await user.click(random);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
  });
  it("Using Create Memory History", async () => {
    const history = createMemoryHistory();
    const { user } = renderWithRouterAndHistory(
      <Navbar isLoggedIn={true} />,
      history,
    );
    const links = screen.getAllByRole("link");
    const sorted = links[2];

    expect(history.location.pathname).toBe("/");
    await user.click(sorted);
    expect(history.location.pathname).toBe("/sorted");
    const myRatings = links[3];
    const logout = links[4];
    await user.click(myRatings);
    expect(history.location.pathname).toBe("/myratings");
    await user.click(logout);
    expect(history.location.pathname).toBe("/logout");
  });
  it("Expands hamburger menu", async () => {
    resizeScreenSize(700);
    const { user } = renderWithRouter(<Navbar isLoggedIn={true} />);
    const hamburgerButton = screen.getByRole("button");
    await user.click(hamburgerButton);
    const navbarDiv = screen.getByRole("navigation");
    expect(navbarDiv).toHaveClass("navigation expanded");
    await user.click(hamburgerButton);
    expect(navbarDiv).toHaveClass("navigation");
  });
  test("not logged in", async () => {
    const history = createMemoryHistory();
    const { user } = renderWithRouterAndHistory(
      <Navbar isLoggedIn={false} />,
      history,
    );
    const links = screen.getAllByRole("link");
    const login = links[3];
    const signup = links[4];
    expect(history.location.pathname).toBe("/");
    await user.click(login);
    expect(history.location.pathname).toBe("/login");
    await user.click(signup);
    expect(history.location.pathname).toBe("/register");
  });
});
