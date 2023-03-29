import React, { useEffect, useState } from "react";
import { getUserDbDogs } from "../../services/backend";
import "./my-ratings.css";
import Table from "../../components/table-component/TableComponent.js";
import { BreedData } from "../../types";

export default function MyRatings() {
  // const [favourites, setFavourites] = useState<BreedData>([]);

  useEffect(() => {
    (async () => {
      const userRatings = await getUserDbDogs();
      console.log(userRatings);
    })();
  }, []);

  return (
    <div className="my-ratings-wrapper">
      <div className="title">My Ratings</div>
      {/* <Table theadData={} tbodyData={} /> */}
    </div>
  );
}
