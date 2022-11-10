import React from "react";
import "./rated-dogs.css";
import PagedTable from "../common/paged-table/PagedTable";

export default function RatedDogs() {
  return (
    <>
      <div className="title">Rated Dogs</div>
      <div className="title">List all dogs</div>
      <div className="title">And their ratings</div>
      <div className="title">Have a filter</div>
      <div className="title">For users ratings</div>
      <div className="title">and other filters</div>
      <PagedTable
        key={"bigDickTable"}
        theadData={["Breed", "Sub-Breed", "Rating"]}
        tbodyData={someData}
      />
    </>
  );
}

const someData = [
  { breed: "Test", subBreed: "TestSub", rating: 5 },
  { subBreed: "TestSub", breed: "Test", rating: 5 },
  { breed: "Test", subBreed: "TestSub", rating: 5 },
  { breed: "Test", subBreed: "TestSub", rating: 5 },
  { breed: "Test", subBreed: "TestSub", rating: 5 },
  { breed: "Test", subBreed: "TestSub", rating: 5 },
  { breed: "Test", subBreed: "TestSub", rating: 5 },
];
