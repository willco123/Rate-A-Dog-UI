import React, { useEffect, useState } from "react";
import "./home.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";

import {
  getAllDbDogs,
  postDogs,
  getMoreDbDogs,
  getFilteredCount,
  getAllSorted,
  getDogByUrl,
} from "../../services/backend/dogs.js";

import Carousel from "../../components/carousel/Carousel";
import { UrlRatingData } from "../../types";

function Home() {
  const [maxSamples, setMaxSamples] = useState<number | null>(null);
  const [chosenRating, setChosenRating] = useState<number | null>(null);
  const [currentMaxIndex, setCurrentMaxIndex] = useState<number | null>(null);
  const [sortMode, setSortMode] = useState<
    "random" | "averageRating" | "breed" | "numberOfRates"
  >("random");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [scrollDir, setScrollDir] = useState<"left" | "right">("right");
  const [filteredBreed, setFilteredBreed] = useState<
    { breed: string; subBreed: string | null } | undefined
  >(undefined);
  const [selectedCarousel, setSelectedCarousel] = useState<
    "first" | "second" | null
  >(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [myRating, setMyRating] = useState<number | null>(null);
  const [homeData, setHomeData] = useState<UrlRatingData[]>([]);
  const [firstArrayData, setFirstArrayData] = useState<UrlRatingData[]>([]);
  const [secondArrayData, setSecondArrayData] = useState<UrlRatingData[]>([]);
  const sampleSize = 100;
  const sliceIndex = Math.floor(sampleSize / 2);

  //on sort or filter, get max samples

  async function handleRateClick() {
    if (
      url === null ||
      selectedBreed === null ||
      chosenRating === null ||
      selectedCarousel === null ||
      selectedCarouselIndex === null
    )
      return;
    await postDogs(url, selectedBreed, selectedSubBreed, chosenRating);
    if (sortMode != "random") {
      const updatedData: UrlRatingData[] = await getAllSorted(
        sortOrder,
        sortMode,
        currentMaxIndex! - 100,
        sampleSize,
        filteredBreed,
      );
      setHomeData(updatedData);
    } else if (sortMode === "random") {
      const updatedUrl = await getDogByUrl(url);
      const homeDataClone = [...homeData];
      const newAverageRating = updatedUrl.averageRating;
      const newMyRating = updatedUrl.myRating;
      const newNumberOfRates = updatedUrl.numberOfRates;
      let targetImage;
      if (selectedCarousel === "first") {
        targetImage = homeDataClone[selectedCarouselIndex];
      } else if (selectedCarousel === "second") {
        targetImage = homeDataClone[selectedCarouselIndex + 50];
      }
      if (!targetImage) return;
      targetImage.averageRating = newAverageRating;
      targetImage.myRating = newMyRating;
      targetImage.numberOfRates = newNumberOfRates;
      setHomeData(homeDataClone);
    }

    setMyRating(chosenRating);
  }

  useEffect(() => {
    const updatedItem = homeData.find((item) => item.url === url);
    if (updatedItem && updatedItem.averageRating != null)
      setAverageRating(updatedItem.averageRating);
  }, [myRating]);

  function setSelectedImageData(
    selectedBreed: string | undefined,
    selectedSubBreed: string | null | undefined,
    averageRating: number | null | undefined,
    url: string | undefined,
    myRating: number | null | undefined,
    selectedCarousel: "first" | "second" | null,
    selectedCarouselIndex: number | null,
  ) {
    if (!myRating) myRating = null;
    if (!averageRating) averageRating = null;
    setMyRating(myRating);
    if (selectedBreed) setSelectedBreed(selectedBreed);
    if (selectedSubBreed === undefined) selectedSubBreed = null;
    setSelectedSubBreed(selectedSubBreed);
    setAverageRating(averageRating);
    if (url) setUrl(url);
    setSelectedCarousel(selectedCarousel);
    setSelectedCarouselIndex(selectedCarouselIndex);
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setChosenRating(selectedRatingAsNumber);
  }

  useEffect(() => {
    sortMode;
  }, [sortMode]);

  useEffect(() => {
    (async () => {
      if (sortMode === "random") {
        setMaxSamples(null);
        setCurrentMaxIndex(null);
        const dbDogs = await getAllDbDogs(sampleSize);
        setHomeData(dbDogs);
      } else {
        setCurrentMaxIndex(100); // was 50 for some reason
        const dbDogs = await getAllSorted(
          sortOrder,
          sortMode,
          0,
          sampleSize,
          filteredBreed,
        ); //filters here
        setHomeData(dbDogs);
      }
    })();
  }, [sortMode]);

  useEffect(() => {
    const firstSlice = homeData.slice(0, sliceIndex);
    const secondSlice = homeData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [homeData]);

  async function mutateHomeData(
    targetArray: "first" | "second",
    carousel: HTMLDivElement,
    direction: "left" | "right",
  ) {
    let moreDogs: UrlRatingData[];
    if (sortMode === "random") moreDogs = await getMoreDbDogs(50, homeData);
    else {
      if (currentMaxIndex === null) return;
      let newMaxIndex: number = 0;
      if (direction === "left" && scrollDir === "left")
        newMaxIndex = currentMaxIndex - 50;
      if (direction === "left" && scrollDir === "right") {
        newMaxIndex = currentMaxIndex - 100;
      }
      if (direction === "right" && scrollDir === "right")
        newMaxIndex = currentMaxIndex + 50;
      if (direction === "right" && scrollDir === "left")
        newMaxIndex = currentMaxIndex + 100;

      moreDogs = await getAllSorted(
        sortOrder,
        sortMode,
        newMaxIndex,
        50,
        filteredBreed,
      );
      setScrollDir(direction);
      setCurrentMaxIndex(newMaxIndex);
    } //filters here
    if (targetArray === "first") {
      const homeDataClone = [...moreDogs, ...homeData.slice(sliceIndex)];
      setHomeData(homeDataClone);
    }
    if (targetArray === "second") {
      const homeDataClone = [...homeData.slice(0, sliceIndex), ...moreDogs];
      setHomeData(homeDataClone);
    }

    const totalImageLength = moreDogs.length * 300;
    const gapLength = (moreDogs.length - 1) * 5;
    carousel.style.width = `${totalImageLength + gapLength}px`;
  }

  function handleFilter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchInput = e.target as HTMLInputElement;
      const breed = searchInput.value;
      setFilteredBreed({ breed, subBreed: "american" });
      // setFilteredBreed({ breed: "wolfhound", subBreed: "irish" });
    }
  }

  useEffect(() => {
    if (filteredBreed)
      async () => {
        const currentCount = await getFilteredCount(filteredBreed);
        setMaxSamples(currentCount);
      };
    if (!filteredBreed) setMaxSamples(null);
  }, [filteredBreed]);

  return (
    <div className="home-wrapper">
      <button onClick={() => setSortMode("breed")}>breed</button>
      <button onClick={() => setSortMode("averageRating")}>
        averageRating
      </button>
      <button onClick={() => setSortMode("numberOfRates")}>
        numberOfRates
      </button>
      <button onClick={() => setSortMode("random")}>random</button>
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
          <span>AvgRating: {averageRating}</span>
          <span>MyRating: {myRating}</span>
        </div>
        <div className="chosen-image-home"></div>
        <FiveStarRating onChange={handleRatingChange} />
        <button onClick={handleRateClick} className="Dogs-button">
          Rate the Dog!
        </button>
      </div>
      {homeData && (
        <Carousel
          key={"home-data" + homeData.length}
          firstArrayData={firstArrayData}
          secondArrayData={secondArrayData}
          setSelectedImageData={setSelectedImageData}
          mutateArrayData={mutateHomeData}
          maxSamples={maxSamples}
          currentMaxIndex={currentMaxIndex}
          sampleSize={sampleSize}
          sortMode={sortMode}
        />
      )}
    </div>
  );
}

export default Home;

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
