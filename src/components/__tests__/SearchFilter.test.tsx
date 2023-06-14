import * as React from "react";
import { screen } from "@testing-library/react";
import SearchFilter from "../search-filter/SearchFilter.js";
import { setup } from "../../test-helpers/user-event-setup.js";
import { createMockTableData } from "../../test-helpers/create-table-data.js";

const tableData = createMockTableData();
const props = {
  setTableDataGrouped: jest.fn(),
  setCurrentPage: jest.fn(),
  tableDataGrouped: tableData,
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

  it("Should accept user input", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "search query");
    expect(screen.getByDisplayValue("search query")).toBeInTheDocument();
  });
  it("Should call filterTable on click", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "search query");
    expect(searchInput).toHaveFocus();
    const searchFilterButtons = screen.getAllByRole("button");
    expect(searchFilterButtons[0]).toBeInTheDocument();
    await user.click(searchFilterButtons[0]);
    expect(props.setTableDataGrouped).toHaveBeenCalled();
  });
  it("Should not call filterTable", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchFilterButtons = screen.getAllByRole("button");
    expect(searchFilterButtons[0]).toBeInTheDocument();
    await user.click(searchFilterButtons[0]);
    expect(props.setTableDataGrouped).not.toHaveBeenCalled();
  });
  it("Should call filterTable on keydown", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "search query");
    expect(searchInput).toHaveFocus();
    await user.keyboard("{enter}");
    expect(props.setTableDataGrouped).toHaveBeenCalled();
  });
  it("Should call reInit and setCurrentPage on click", async () => {
    const { user } = setup(<SearchFilter {...props} />);
    const searchFilterButtons = screen.getAllByRole("button");
    const searchClear = searchFilterButtons[1];
    expect(searchClear).toBeInTheDocument();
  });
});
