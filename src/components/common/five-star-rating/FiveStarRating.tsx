import React from "react";
import "./five-star-rating.css";

export default function FiveStarRating() {
  return (
    <>
      <div className="star-container">
        <input type="radio" name="rating" value="5" id="5" />
        <label htmlFor="5" />

        <input type="radio" name="rating" value="4" id="4" />
        <label htmlFor="4" />

        <input type="radio" name="rating" value="3" id="3" />
        <label htmlFor="3" />

        <input type="radio" name="rating" value="2" id="2" />
        <label htmlFor="2" />

        <input type="radio" name="rating" value="1" id="1" />
        <label htmlFor="1" />
      </div>
    </>
  );
}
