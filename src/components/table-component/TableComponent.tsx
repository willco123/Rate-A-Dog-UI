import React from "react";

export type TableComponentProps = {
  tbodyData: { [key: string]: JSX.Element }[];
  theadData: string[];
};

export default function TableComponent({
  theadData,
  tbodyData,
}: TableComponentProps) {
  return (
    <table className="table-component">
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
            const tbodyDataRow = Object.values(item);
            const firstItem = tbodyDataRow[0];
            const rowKey = firstItem.key;
            return <TableRow key={rowKey} tbodyDataRow={tbodyDataRow} />;
          })}
        </tbody>
      )}
    </table>
  );
}

function TableHeadItem({ item }: { item: string }) {
  return <td title={item}>{item}</td>;
}

function TableRow({ tbodyDataRow }: { tbodyDataRow: JSX.Element[] }) {
  return <tr>{tbodyDataRow.map((element: JSX.Element) => element)}</tr>;
}
