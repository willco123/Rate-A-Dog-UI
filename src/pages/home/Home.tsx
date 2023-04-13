import React, { useEffect, useState } from "react";
import "./home.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import { tableDataToTdJSXHomePage } from "../../utils/format-data/home-data.js";

import { postDogs } from "../../services/backend";
import parseUrlForBreeds from "../../utils/parse-url-for-breeds";
import { useHomeDataInit } from "../../custom-hooks/useHomeDataInit";
import Carousel from "../../components/carousel/Carousel";

function Home() {
  const {
    activeSubBreeds,
    dogImage,
    tableData,
    setTableDataJSX,
    setActiveSubBreeds,
  } = useHomeDataInit(
    handleRadioChange,
    handleDropDownChange,
    isDropDownActive,
  );

  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    //force re-render
    const tableDataTdJSX = tableDataToTdJSXHomePage(
      tableData,
      handleRadioChange,
      handleDropDownChange,
      isDropDownActive,
      activeSubBreeds,
    );
    setTableDataJSX(tableDataTdJSX);
  }, [selectedBreed, activeSubBreeds]);

  function isDropDownActive(breedBeingRendered: string) {
    if (selectedBreed === breedBeingRendered) return true;
    return false;
  }

  function handleRadioChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const firstSubBreed = tableData[index].subBreed[0];
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
    setSelectedSubBreed(firstSubBreed);
  }

  function handleDropDownChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
  ) {
    const newSelectedSubBreed = event.target.value;
    const associatedBreed = tableRowId;
    const activeSubBreedsClone = [...activeSubBreeds];
    const activeObject = activeSubBreedsClone.find(
      (element) => element.breed == associatedBreed,
    );
    if (!activeObject) throw new Error("breed is undefined");
    activeObject.activeSubBreed = newSelectedSubBreed;
    setActiveSubBreeds(activeSubBreedsClone);
    setSelectedSubBreed(newSelectedSubBreed);
  }

  async function handleRateClick() {
    let breed: string = "";
    let subBreed: string | null | undefined = "";
    [breed, subBreed] = parseUrlForBreeds(dogImage);

    await postDogs(dogImage, breed, subBreed, rating);
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setRating(selectedRatingAsNumber);
  }

  return (
    <div className="home-wrapper">
      <div>
        <span>Breed</span>
        <span>Sub-Breed</span>
      </div>
      <div>
        <span>AvgRating</span>
        <span>MyRating:</span>
      </div>

      <Carousel />
      <FiveStarRating onChange={handleRatingChange} />

      <button onClick={handleRateClick} className="Dogs-button">
        Rate the Dog!
      </button>
    </div>
  );
}

export default Home;
