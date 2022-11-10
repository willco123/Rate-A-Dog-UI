import React, { useState, useEffect } from "react";
import { TableBodyData, TableProps, TableRowProps } from "./types";
import "./paged-table.css";

export default function PagedTable({ theadData, tbodyData }: TableProps) {
  // const [breedData, setBreedData] = useState<TableBodyData[]>();
  // function sortData() {}
  // setBreedData(tbodyData);

  return (
    <table className="paged-table">
      <colgroup>
        <col id="Breed" />
        <col id="subBreed" />
        <col id="rating" />
      </colgroup>
      <thead>
        <tr>
          {theadData.map((header) => {
            return <TableHeadItem key={header} item={header} />;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((item, index) => {
          return <TableRow key={theadData[index]} data={item} />;
        })}
      </tbody>
    </table>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

function TableRow({ data }: TableRowProps) {
  return (
    <tr>
      {Object.entries(data).map((item) => {
        return <td>{item[1]}</td>;
      })}
    </tr>
  );
}
