import React, { useState } from "react";
import "./all-sorted.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import Carousel from "../../components/carousel/Carousel.js";
import { SortTypes } from "../../types";
import useDetermineSelection from "../../custom-hooks/useDetermineSelection.js";
import useImageExpansion from "../../custom-hooks/useImageExpansion.js";
import useSetData from "../../custom-hooks/all-sorted/useSetData.js";
import useUpdateRating from "../../custom-hooks/all-sorted/useUpdateRating.js";

function AllSorted() {
  const [sampleSize, setSampleSize] = useState<number>(100);
  const [chosenRating, setChosenRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [scrollDir, setScrollDir] = useState<"left" | "right">("right");
  const [filteredBreed, setFilteredBreed] = useState<
    { breed: string; subBreed: string | null } | undefined
  >(undefined);
  const [sortMode, setSortMode] = useState<SortTypes>("breed");

  const {
    sortedData,
    carouselDataFirst,
    carouselDataSecond,
    skipCount,
    maxSamples,
    mutateSortedData,
    setSortedData,
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
    sortedData,
    selectedMyRating,
    sortOrder,
    sortMode,
    skipCount,
    sampleSize,
    filteredBreed,
    setSortedData,
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

  function handleFilter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchInput = e.target as HTMLInputElement;
      const breed = searchInput.value;
      setFilteredBreed({ breed, subBreed: "american" });
      // setFilteredBreed({ breed: "wolfhound", subBreed: "irish" });
    }
  }

  return (
    <div className="home-wrapper">
      <button onClick={() => setSortMode("breed")}>breed</button>
      <button onClick={() => setSortMode("averageRating")}>
        averageRating
      </button>
      <button onClick={() => setSortMode("numberOfRates")}>
        numberOfRates
      </button>
      <input
        type="text"
        name="filter-breed"
        id="filter-breed"
        placeholder="Filter Breed"
        onKeyDown={handleFilter}
      />

      <div className="image-data">
        <span>Breed: {selectedBreed}</span>
        <span>Sub-Breed : {selectedSubBreed}</span>

        <div>
          <span>AvgRating: {selectedAverageRating}</span>
          <span>MyRating: {selectedMyRating}</span>
        </div>
        <div className="chosen-image-home"></div>
        <FiveStarRating onChange={handleRatingChange} />
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="Dogs-button"
        >
          Rate the Dog!
        </button>
      </div>

      <Carousel
        key={"sorted" + sortedData.length}
        carouselDataFirst={carouselDataFirst}
        carouselDataSecond={carouselDataSecond}
        selectedImageHTML={selectedImageHTML}
        isAnImageExpanded={isAnImageExpanded}
        mutateArrayData={mutateSortedData}
        setSelectedImageHTML={setSelectedImageHTML}
        setIsAnImageExpanded={setIsAnImageExpanded}
        maxSamples={maxSamples}
        skipCount={skipCount}
        sampleSize={sampleSize}
      />
    </div>
  );
}

export default AllSorted;

// function addOneToFirst() {
//   const firstSlice = homeData.slice(0, sliceIndex);
//   const currentArrayLength = firstArrayData.length;
//   const newFirstArrayData = firstSlice.slice(0, currentArrayLength + 20);
//   setFirstArrayData(newFirstArrayData);
// }

// function addOneToSecond() {
//   const secondSlice = homeData.slice(sliceIndex);
//   const currentArrayLength = secondArrayData.length;
//   const newSecondArrayData = secondSlice.slice(0, currentArrayLength + 20);
//   setSecondArrayData(newSecondArrayData);
// }

// function removeOneFromFirst() {
//   const firstArrayDataClone = [...firstArrayData];

//   setFirstArrayData(firstArrayDataClone.slice(0, 30));
// }

// function removeOneFromsecond() {
//   const secondArrayDataClone = [...secondArrayData];

//   setSecondArrayData(secondArrayDataClone.slice(0, 30));
// }
