import React, { useState } from "react";
import "./rated-dogs.css";
import PagedTable from "../common/paged-table/PagedTable";

export default function RatedDogs() {
  const [tableData, setTableData] = useState(someData);

  return (
    <>
      <div className="title">Rated Dogs</div>
      <div className="title">List all dogs</div>
      <div className="title">And their ratings</div>
      <div className="title">Have a filter</div>
      <div className="title">For users ratings</div>
      <div className="title">and other filters</div>
      <PagedTable
        key={"PagedTable"}
        setTableData={setTableData}
        theadData={["Breed", "Sub-Breed", "Rating"]}
        tbodyData={tableData}
        initialState={someData}
      />
    </>
  );
}

type TableBodyData = {
  breed: string;
  subBreed: string | null;
  rating: number;
};

const someData: TableBodyData[] = [
  { breed: "Test1", subBreed: "TestSub1", rating: 1 },
  { subBreed: "TestSub2", breed: "Test2", rating: 2 },
  { breed: "Test3", subBreed: "TestSub3", rating: 3 },
  { breed: "Test4", subBreed: "TestSub4", rating: 4 },
  { breed: "Test5", subBreed: "TestSub5", rating: 5 },
  { breed: "Test6", subBreed: "TestSub6", rating: 6 },
  { breed: "Test7", subBreed: "TestSub7", rating: 7 },
  { breed: "Test1", subBreed: "TestSub1", rating: 1 },
  { subBreed: "TestSub2", breed: "Test2", rating: 2 },
  { breed: "Test3", subBreed: "TestSub3", rating: 3 },
  { breed: "Test4", subBreed: "TestSub4", rating: 4 },
  { breed: "Test5", subBreed: "TestSub5", rating: 5 },
  { breed: "Test6", subBreed: "TestSub6", rating: 6 },
  { breed: "Test7", subBreed: "TestSub7", rating: 7 },
  { breed: "Test1", subBreed: "TestSub1", rating: 1 },
  { subBreed: "TestSub2", breed: "Test2", rating: 2 },
  { breed: "Test3", subBreed: "TestSub3", rating: 3 },
  { breed: "Test4", subBreed: "TestSub4", rating: 4 },
  { breed: "Test5", subBreed: "TestSub5", rating: 5 },
  { breed: "Test6", subBreed: "TestSub6", rating: 6 },
  { breed: "Test7", subBreed: "TestSub7", rating: 7 },
];
