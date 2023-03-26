import React, { useEffect, useState } from "react";
import { getFavourites } from "../../services/backend";
import "./favourites.css";
import Table from "../../components/table-component/TableComponent.js";

export default function Favourites() {
  useEffect(() => {
    (async () => {
      const favourites = await getFavourites();
      console.log(favourites);
    })();
  }, []);
  return (
    <div className="favourites-wrapper">
      <div className="title">Favourites</div>
      <div className="title">Show Favourites</div>
      <div className="title">And their ratings</div>
    </div>
  );
}
