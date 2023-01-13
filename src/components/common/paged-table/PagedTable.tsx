import React, { useState, useMemo } from "react";
import { TableProps, TableRowProps } from "./types";
import Pagination from "../pagination/Pagination";
import SearchFilter from "../search-filter/SearchFilter";
import "./paged-table.css";
import CollapsibleSpan from "../collapsible-span/CollapsibleSpan";

export default function PagedTable({
  theadData,
  tbodyData,
  setTableData,
  initialState,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return tbodyData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tbodyData]);

  return (
    <div className="paged-table-container">
      <CollapsibleSpan
        WrappedComponent={
          <SearchFilter
            setTableData={setTableData}
            initialState={initialState}
          />
        }
      />

      <table className="paged-table">
        <thead>
          <tr>
            {theadData.map((header) => {
              return <TableHeadItem key={header} item={header} />;
            })}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            const rowKey = item.subBreed
              ? item.breed + item.subBreed
              : item.breed;

            return <TableRow key={rowKey} data={item} />;
          })}
        </tbody>
      </table>

      <Pagination
        data={tbodyData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

function TableRow({ data }: TableRowProps) {
  return (
    <tr>
      {Object.entries(data).map((item) => {
        const [k, v] = item;
        return <td key={v}>{v}</td>;
      })}
    </tr>
  );
}
