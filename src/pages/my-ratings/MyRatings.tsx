import React, { useEffect, useState } from "react";
import "./my-ratings.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import { UrlRatingData } from "../../types";
import {
  postDogs,
  getUserDbDogs,
  getUserCount,
  getUserFilteredCount,
} from "../../services/backend/dogs.js";

import Carousel from "../../components/carousel/Carousel";

function MyRatings() {
  const [maxSamples, setMaxSamples] = useState<number>(0);
  const [chosenRating, setChosenRating] = useState<number | null>(null);
  const [currentMaxIndex, setCurrentMaxIndex] = useState<number>(100);
  const [sortMode, setSortMode] = useState<
    "averageRating" | "numberOfRates" | "myRating" | "breed"
  >("averageRating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const [userData, setUserData] = useState<UrlRatingData[]>([]);
  const [firstArrayData, setFirstArrayData] = useState<UrlRatingData[]>([]);
  const [secondArrayData, setSecondArrayData] = useState<UrlRatingData[]>([]);
  const sampleSize = 100;
  const sliceIndex = Math.floor(sampleSize / 2);

  async function handleRateClick() {
    if (url === null || selectedBreed === null || chosenRating === null) return;
    await postDogs(url, selectedBreed, selectedSubBreed, chosenRating);
    const updatedData: UrlRatingData[] = await getUserDbDogs(
      sortOrder,
      sortMode,
      currentMaxIndex - 100,
      sampleSize,
    );
    setUserData(updatedData);
    setMyRating(chosenRating);
    const updatedItem = updatedData.find((item) => item.url === url);
    if (updatedItem && updatedItem.averageRating != null)
      setAverageRating(updatedItem.averageRating);
  }

  function setSelectedImageData(
    selectedBreed: string | undefined,
    selectedSubBreed: string | null | undefined,
    averageRating: number | null | undefined,
    url: string | undefined,
    myRating: number | null | undefined,
  ) {
    if (myRating) setMyRating(myRating);
    if (selectedBreed) setSelectedBreed(selectedBreed);
    if (selectedSubBreed === undefined) selectedSubBreed = null;
    setSelectedSubBreed(selectedSubBreed);
    if (averageRating) setAverageRating(averageRating);
    if (url) setUrl(url);
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setChosenRating(selectedRatingAsNumber);
  }

  useEffect(() => {
    (async () => {
      const dbDogs = await getUserDbDogs(sortOrder, sortMode, 0, 100);
      setUserData(dbDogs);
    })();
  }, [sortMode]);

  // useEffect(()=> {

  // }, [filteredBreed])

  useEffect(() => {
    const firstSlice = userData.slice(0, sliceIndex);
    const secondSlice = userData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [userData]);

  async function mutateUserData(targetArray: "first" | "second") {
    const moreDogs = await getUserDbDogs(sortOrder, sortMode, currentMaxIndex);
    if (targetArray === "first") {
      const userDataClone = [...moreDogs, ...userData.slice(sliceIndex)];
      setUserData(userDataClone);
    }
    if (targetArray === "second") {
      const userDataClone = [...userData.slice(0, sliceIndex), ...moreDogs];
      setUserData(userDataClone);
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
      <button onClick={() => setSortMode("myRating")}>myRating</button>
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
      {userData && (
        <Carousel
          firstArrayData={firstArrayData}
          secondArrayData={secondArrayData}
          key={"my-ratings-data" + userData.length}
          setSelectedImageData={setSelectedImageData}
          mutateArrayData={mutateUserData}
          maxSamples={maxSamples}
          currentMaxIndex={currentMaxIndex}
          sampleSize={sampleSize}
          sortMode={sortMode}
        />
      )}
    </div>
  );
}

export default MyRatings;
