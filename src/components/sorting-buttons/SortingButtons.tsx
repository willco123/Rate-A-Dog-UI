import React from "react";
import { SortTypes } from "../../types";

export default function SortingButtons({
  sortMode,
  setSortMode,
  sortOrder,
  setSortOrder,
}: {
  sortMode: string;
  sortOrder: string;
  setSortMode: React.Dispatch<React.SetStateAction<SortTypes>>;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}) {
  return (
    <>
      <div>
        <button
          className={sortMode === "breed" ? "glow" : ""}
          onClick={() => setSortMode("breed")}
        >
          Breed
        </button>
        <button
          className={sortMode === "averageRating" ? "glow" : ""}
          onClick={() => setSortMode("averageRating")}
        >
          Rating
        </button>
        <button
          className={sortMode === "numberOfRates" ? "glow" : ""}
          onClick={() => setSortMode("numberOfRates")}
        >
          Votes
        </button>
      </div>
      <div>
        <button
          className={sortOrder === "asc" ? "glow" : ""}
          onClick={() => setSortOrder("asc")}
        >
          Ascending
        </button>
        <button
          className={sortOrder === "desc" ? "glow" : ""}
          onClick={() => setSortOrder("desc")}
        >
          Descending
        </button>
      </div>
    </>
  );
}
