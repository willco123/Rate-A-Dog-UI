import React, { useEffect, useState } from "react";
import "./rated-dogs.css";
import PagedTable from "../common/paged-table/PagedTable";
import getBreeds from "../../services/get-breeds";

export default function RatedDogs() {
  const [tableData, setTableData] = useState<TableData[] | []>([]);
  const [initialState, setInitialState] = useState<TableData[] | []>([]);
  console.log("Rated Dogs");
  useEffect(() => {
    (async () => {
      //should grab data from the backend, using a hack for display purposes atm
      const myBreeds = await getBreeds();

      const hackyBreedsList: TableData[] = [];
      console.log("Rated Dogs UE");
      Object.entries(myBreeds).forEach((element: any) => {
        const ratingArray: number[] = [];

        if (element[1].length == 0) {
          ratingArray.push(Math.floor(Math.random() * 10));
        } else {
          for (let i in element[1]) {
            ratingArray.push(Math.floor(Math.random() * 10));
          }
        }

        const breedObject: TableData = {
          breed: element[0],
          subBreed: element[1],
          rating: [123],
        };

        hackyBreedsList.push(breedObject);
      });
      setTableData(hackyBreedsList);
      setInitialState(hackyBreedsList);
    })();
  }, []);

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
        tableData={tableData}
        initialState={initialState}
      />
    </>
  );
}

type TableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number[];
};
