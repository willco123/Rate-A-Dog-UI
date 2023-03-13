import React, { useEffect, useState } from "react";
import "./favourites.css";
import Table from "../../components/table-component/TableComponent.js";

export default function Favourites() {
  return (
    <div className="favourites-wrapper">
      <div className="title">Favourites</div>
      <div className="title">Show Favourites</div>
      <div className="title">And their ratings</div>
    </div>
  );
}
