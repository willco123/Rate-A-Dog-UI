import React from "react";
import "./five-star-rating.css";

export default function FiveStarRating({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <div className="star-container">
        <input
          type="radio"
          name="rating"
          value="5"
          id="5"
          onChange={onChange}
        />
        <label htmlFor="5" aria-label="input-5" />

        <input
          type="radio"
          name="rating"
          value="4"
          id="4"
          onChange={onChange}
        />
        <label htmlFor="4" aria-label="input-4" />

        <input
          type="radio"
          name="rating"
          value="3"
          id="3"
          onChange={onChange}
        />
        <label htmlFor="3" aria-label="input-3" />

        <input
          type="radio"
          name="rating"
          value="2"
          id="2"
          onChange={onChange}
        />
        <label htmlFor="2" aria-label="input-2" />

        <input
          type="radio"
          name="rating"
          value="1"
          id="1"
          onChange={onChange}
        />
        <label htmlFor="1" aria-label="input-1" />
      </div>
    </>
  );
}
