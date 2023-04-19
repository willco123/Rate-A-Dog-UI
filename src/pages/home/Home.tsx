import React, { useEffect, useState } from "react";
import "./home.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";

import { getAllDbDogs, postDogs, getMoreDbDogs } from "../../services/backend";

import Carousel from "../../components/carousel/Carousel";
import { UrlRatingData } from "../../types";

function Home() {
  const [maxSamples, setMaxSamples] = useState<number>(0);
  const [sortMode, setSortMode] = useState<string>("random");
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const [homeData, setHomeData] = useState<UrlRatingData[]>([]);
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
      const dbDogs = await getAllDbDogs(sampleSize);

      setHomeData(dbDogs);
    })();
  }, []);

  useEffect(() => {
    const firstSlice = homeData.slice(0, sliceIndex);
    const secondSlice = homeData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [homeData]);

  async function mutateHomeData(
    targetArray: "first" | "second",
    carousel: HTMLDivElement,
  ) {
    const moreDogs = await getMoreDbDogs(50, homeData);

    if (targetArray === "first") {
      const homeDataClone = [...moreDogs, ...homeData.slice(sliceIndex)];
      setHomeData(homeDataClone);
    }
    if (targetArray === "second") {
      const homeDataClone = [...homeData.slice(0, sliceIndex), ...moreDogs];
      setHomeData(homeDataClone);
    }
    carousel.style.width = `${moreDogs.length * 300}px`;
  }

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

  return (
    <div className="home-wrapper">
      {/* <button onClick={addOneToFirst}>Add One To First</button>
      <button onClick={addOneToSecond}>Add One To Second</button>
      <button onClick={removeOneFromFirst}>Remove One from First</button>
      <button onClick={removeOneFromsecond}>Remove One from Second</button> */}

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
      {homeData && (
        <Carousel
          key={"home-data" + homeData.length}
          firstArrayData={firstArrayData}
          secondArrayData={secondArrayData}
          setSelectedImageData={setSelectedImageData}
          mutateArrayData={mutateHomeData}
        />
      )}
    </div>
  );
}

export default Home;
