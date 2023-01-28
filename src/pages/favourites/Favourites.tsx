import React, { useEffect, useState } from "react";
import "./favourites.css";
import Table from "../../features/select-breeds/filter-table/FilterTable";

export default function Favourites() {
  return (
    <div className="favourites-wrapper">
      <div className="title">Favourites</div>
      <div className="title">Show Favourites</div>
      <div className="title">And their ratings</div>
    </div>
  );
}
