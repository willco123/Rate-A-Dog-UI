import React, { useState, useMemo, useEffect } from "react";
import { PagedTableProps, PagedTableRowProps, PagedTableData } from "./types";
import Pagination from "../pagination/Pagination";
import SearchFilter from "../search-filter/SearchFilter";
import "./paged-table.css";
import CollapsibleSpan from "../collapsible-span/CollapsibleSpan";
import DropDown from "../drop-down/DropDown";

export default function PagedTable({
  theadData,
  tbodyData,
  handleDropDownChange,
}: PagedTableProps) {
  return (
    <div className="paged-table-container">
      <table className="paged-table">
        <thead>
          <tr>
            {theadData.map((header) => {
              return <TableHeadItem key={header} item={header} />;
            })}
          </tr>
        </thead>
        {tbodyData && (
          <tbody>
            {tbodyData.map((item) => {
              // const rowKey = item.subBreed
              //   ? item.breed + item.subBreed
              //   : item.breed;
              const rowKey = item.breed;

              return (
                <TableRow
                  key={rowKey}
                  data={item}
                  thead={theadData}
                  handleDropDownChange={handleDropDownChange}
                  tableParentElement={rowKey}
                />
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

function TableRow({
  data,
  thead,
  handleDropDownChange,
  tableParentElement,
}: PagedTableRowProps) {
  function populateRow(
    item: string | (string | null)[] | number | null,
    index: number,
  ) {
    const parentHeader = thead[index];
    if (Array.isArray(item) && item.length > 1) {
      return (
        <td id={"DropDown"} key={parentHeader}>
          {
            <DropDown
              isDisabled={true}
              onChange={handleDropDownChange}
              key={parentHeader}
              items={item as string[]}
              tableParentElement={tableParentElement}
            />
          }
        </td>
      );
    }
    if (typeof item === "number") {
      return (
        <td id={"rating"} key={item}>
          {item}
        </td>
      );
    }

    if (typeof item === "string") {
      return (
        <td id={item} key={item}>
          {item}
        </td>
      );
    }

    if (item === null)
      return (
        <td id="null" key={"null"}>
          {" "}
        </td>
      );
    if (item.length === 0 || item.length === 1)
      return (
        <td id="null" key={"null"}>
          {" "}
        </td>
      );
  }

  return (
    <tr>
      {Object.values(data).map((item, index) => {
        return populateRow(item, index);
      })}
    </tr>
  );
}
