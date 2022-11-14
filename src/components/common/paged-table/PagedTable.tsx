import React, { useState, useEffect } from "react";
import { TableProps, TableRowProps, PageData } from "./types";
import Pagination from "../pagination/Pagination";
import "./paged-table.css";

export default function PagedTable({ theadData, tbodyData }: TableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  return (
    <div>
      <table className="paged-table">
        <thead>
          <tr>
            {theadData.map((header) => {
              return <TableHeadItem key={header} item={header} />;
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((item) => {
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
        onPageChange={setCurrentPage}
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
