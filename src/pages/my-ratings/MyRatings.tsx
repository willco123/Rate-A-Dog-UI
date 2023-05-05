import React, { useState } from "react";
import "./my-ratings.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import Carousel from "../../components/carousel/Carousel.js";
import { SortTypes } from "../../types";
import useDetermineSelection from "../../custom-hooks/useDetermineSelection.js";
import useImageExpansion from "../../custom-hooks/useImageExpansion.js";
import useSetData from "../../custom-hooks/my-ratings/useSetData.js";
import useUpdateRating from "../../custom-hooks/my-ratings/useUpdateRating.js";
import ExpandableDiv from "../../components/expandable-div/ExpandableDiv";
import { getUserTableData } from "../../services/backend/dogs";

function MyRatings() {
  const [sampleSize, setSampleSize] = useState<number>(100);
  const [chosenRating, setChosenRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [scrollDir, setScrollDir] = useState<"left" | "right">("right");
  const [filteredBreed, setFilteredBreed] = useState<
    { breed: string; subBreed: string | null } | undefined
  >(undefined);
  const [sortMode, setSortMode] = useState<SortTypes>("breed");

  const {
    userData,
    carouselDataFirst,
    carouselDataSecond,
    skipCount,
    maxSamples,
    mutateUserData,
    setUserData,
    setCarouselDataFirst,
    setCarouselDataSecond,
  } = useSetData({
    sampleSize,
    sortMode,
    sortOrder,
    filteredBreed,
    scrollDir,
    setScrollDir,
  });

  const {
    selectedBreed,
    selectedSubBreed,
    selectedAverageRating,
    selectedMyRating,
    selectedUrl,
    selectedImageHTML,
    setSelectedImageHTML,
    setSelectedMyRating,
    setSelectedAverageRating,
  } = useDetermineSelection();

  const { isClicked, setIsClicked } = useUpdateRating({
    selectedUrl,
    selectedBreed,
    selectedSubBreed,
    chosenRating,
    userData,
    selectedMyRating,
    sortOrder,
    sortMode,
    skipCount,
    sampleSize,
    filteredBreed,
    setUserData,
    setSelectedMyRating,
    setSelectedAverageRating,
  });

  const { isAnImageExpanded, setIsAnImageExpanded } = useImageExpansion({
    selectedImageHTML,
    carouselDataFirst,
    carouselDataSecond,
    setCarouselDataFirst,
    setCarouselDataSecond,
  });

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setChosenRating(selectedRatingAsNumber);
  }

  return (
    <div className="all-sorted-wrapper">
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

      <div className="image-data">
        <span>Breed: {selectedBreed}</span>
        <span>Sub-Breed : {selectedSubBreed}</span>

        <div>
          <span>AvgRating: {selectedAverageRating}</span>
          <span>MyRating: {selectedMyRating}</span>
        </div>
        <div className="chosen-image-all-sorted"></div>
        <FiveStarRating onChange={handleRatingChange} />
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="Dogs-button"
        >
          Rate the Dog!
        </button>
      </div>

      <Carousel
        key={"sorted" + userData.length}
        carouselDataFirst={carouselDataFirst}
        carouselDataSecond={carouselDataSecond}
        selectedImageHTML={selectedImageHTML}
        isAnImageExpanded={isAnImageExpanded}
        mutateArrayData={mutateUserData}
        setSelectedImageHTML={setSelectedImageHTML}
        setIsAnImageExpanded={setIsAnImageExpanded}
        maxSamples={maxSamples}
        skipCount={skipCount}
        sampleSize={sampleSize}
      />
      <ExpandableDiv
        getTableData={getUserTableData}
        filteredBreed={filteredBreed}
        setFilteredBreed={setFilteredBreed}
      />
    </div>
  );
}

export default MyRatings;
