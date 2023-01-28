import React, { useEffect, useState } from "react";
import "./dogs.css";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating";
import Table from "../../features/select-breeds/filter-table/FilterTable";
import { getBreeds, getRandomDogImage } from "../../services/dog-ceo";
import type { Breeds } from "../../services/dog-ceo";

function Home() {
  const [dogImage, setDogImage] = useState<string>("");
  const [breedsList, setBreedsList] = useState<Breeds>({});

  useEffect(() => {
    (async () => {
      setDogImage(await getRandomDogImage());
      setBreedsList(await getBreeds());
    })();
  }, []);

  return (
    <div className="Dogs-wrapper">
      <h1 className="title">Dog Ceo Clone</h1>
      {dogImage && <img src={dogImage} className="Dogs-dog-image" />}

      <FiveStarRating />
      <Table
        key={"filter-table"}
        theadData={["Breed", "Sub-Breed"]}
        tbodyData={breedsList}
      />

      <button className="Dogs-button">Get a new Dog!</button>
      <button className="Dogs-button">Rate the Dog!</button>
      <button className="Dogs-button">Add to favourites!</button>
    </div>
  );
}

export default Home;
