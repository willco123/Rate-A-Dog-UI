import React, { useEffect, useState } from "react";
import "./my-ratings.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import { UrlRatingData } from "../../types";
import {
  postDogs,
  getUserDbDogs,
  getMoreUserDbDogs,
} from "../../services/backend";

import Carousel from "../../components/carousel/Carousel";

function MyRatings() {
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
    if (url === null || selectedBreed === null) return;
    await postDogs(url, selectedBreed, selectedSubBreed, averageRating);
  }

  function setSelectedImageData(
    selectedBreed: string | undefined,
    selectedSubBreed: string | null | undefined,
    averageRating: number | null | undefined,
    url: string | undefined,
  ) {
    if (selectedBreed) setSelectedBreed(selectedBreed);
    if (selectedSubBreed === undefined) selectedSubBreed = null;
    setSelectedSubBreed(selectedSubBreed);
    if (averageRating) setAverageRating(averageRating);
    if (url) setUrl(url);
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setAverageRating(selectedRatingAsNumber);
  }

  useEffect(() => {
    (async () => {
      const dbDogs = await getUserDbDogs(sampleSize);
      setUserData(dbDogs);
    })();
  }, []);

  useEffect(() => {
    const firstSlice = userData.slice(0, sliceIndex);
    const secondSlice = userData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [userData]);

  async function mutateUserData(targetArray: "first" | "second") {
    const moreDogs = await getMoreUserDbDogs(sampleSize, userData);
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
      <h1>My Ratings</h1>
      <div className="image-data">
        <span>Breed: {selectedBreed}</span>
        <span>Sub-Breed : {selectedSubBreed}</span>

        <div>
          <span>AvgRating: {averageRating}</span>
          <span>MyRating:</span>
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
        />
      )}
    </div>
  );
}

export default MyRatings;
