import * as React from "react";
import { screen } from "@testing-library/react";
import Pagination from "../pagination/Pagination.js";
import { setup } from "../../test-helpers/user-event-setup.js";

// jest.mock("../../custom-hooks/usePagination").mockImplementation();

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("Pagination", () => {
  it("Should render pagination", () => {
    const dataLength = 30;
    const currentPage = 1;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const leftArrowDiv = pagiantionItems[0].children[0];
    const rightArrowDiv = pagiantionItems.slice(-1)[0].children[0];
    expect(leftArrowDiv).toHaveClass("pagination-arrow left");
    expect(rightArrowDiv).toHaveClass("pagination-arrow right");
    expect(pagiantionItems.length).toBe(dataLength / itemsPerPage + 2);
  });
  it("Should change page", async () => {
    const dataLength = 50;
    const currentPage = 1;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const leftArrow = pagiantionItems[0];
    const rightArrow = pagiantionItems.slice(-1)[0];
    const pageTwo = pagiantionItems[2];
    await user.click(pageTwo);
    await user.click(leftArrow);
    await user.click(rightArrow);
    expect(onPageChange).toHaveBeenCalledTimes(3);
  });
  it("Small number of pages", () => {
    const dataLength = 5;
    const currentPage = 1;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    expect(pagiantionItems.length).toBe(3);
  });
  it("Left arrow disabled", async () => {
    const dataLength = 10;
    const currentPage = 1;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const leftArrow = pagiantionItems[0];
    expect(leftArrow).toHaveClass("pagination-container disabled");
    //pointer-events : none has no effect on user.click
  });
  it("Right arrow disabled", async () => {
    const dataLength = 10;
    const currentPage = 2;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const rightArrow = pagiantionItems.slice(-1)[0];
    expect(rightArrow).toHaveClass("pagination-container disabled");
    //pointer-events : none has no effect on user.click
  });
  it("Should show left dots", async () => {
    const dataLength = 70;
    const currentPage = 12;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const leftDots = pagiantionItems[2];
    await user.click(leftDots);
    expect(onPageChange).not.toBeCalled();
  });
  it("Should show right dots", async () => {
    const dataLength = 70;
    const currentPage = 12;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const rightDots = pagiantionItems.slice(-1)[2];
    await user.click(rightDots);
    expect(onPageChange).not.toBeCalled();
  });
  it("Should show left & right dots", async () => {
    const dataLength = 70;
    const currentPage = 6;
    const itemsPerPage = 5;
    const onPageChange = jest.fn();
    const { user } = setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    const rightDots = pagiantionItems.slice(-1)[2];
    const leftDots = pagiantionItems[2];
    await user.click(rightDots);
    await user.click(leftDots);
    expect(onPageChange).not.toBeCalled();
  });
  it("Return empty array", () => {
    const dataLength = 0;
    const currentPage = 0;
    const itemsPerPage = 0;
    const onPageChange = jest.fn();
    setup(
      <Pagination
        dataLength={dataLength}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />,
    );

    const pagiantionItems = screen.getAllByRole("listitem");
    expect(pagiantionItems.length).toEqual(2);
  });
});
