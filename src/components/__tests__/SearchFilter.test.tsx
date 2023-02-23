import * as React from "react";
import { screen } from "@testing-library/react";
import SearchFilter from "../search-filter/SearchFilter";
import { setup } from "../../test-helpers/user-event-setup";

const props = {
  filterTable: jest.fn(),
  setCurrentPage: jest.fn(),
  reInitTableData: jest.fn(),
  breedData: [
    {
      breed: "breed",
      subBreed: ["subBreed"],
      rating: [5],
    },
  ],
};

// let refSpy: jest.SpyInstance;

// refSpy = jest.spyOn(React, "useRef").mockImplementation((): any => {
//   return { current: 1 };
// });

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("SearchFilter", () => {
  it("Should render", () => {
    setup(<SearchFilter {...props} />);
  });

  it("Should accept user input and fire on keydown", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "search query");
    expect(screen.getByDisplayValue("search query")).toBeInTheDocument();
    await user.keyboard("{enter}");
    expect(props.filterTable).toHaveBeenCalledTimes(1);
  });
  it("Should call filterTable on click", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "search query");
    expect(searchInput).toHaveFocus();
    const searchFilterButtons = screen.getAllByRole("button");
    const searchIcon = searchFilterButtons[0];
    await user.click(searchIcon);
    expect(props.filterTable).toHaveBeenCalledTimes(1);
  });
  it("Should call reInit and setCurrentPage on click", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchFilterButtons = screen.getAllByRole("button");
    const searchClear = searchFilterButtons[1];
    await user.click(searchClear);
    expect(props.reInitTableData).toHaveBeenCalled();
    expect(props.setCurrentPage).toHaveBeenCalledWith(1);
  });
  it("Should not call filterTable as no input query", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchFilterButtons = screen.getAllByRole("button");
    const searchIcon = searchFilterButtons[0];
    await user.click(searchIcon);
    expect(props.filterTable).not.toHaveBeenCalled();
  });
});
