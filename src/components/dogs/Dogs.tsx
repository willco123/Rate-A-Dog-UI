import React, { useEffect, useState } from "react";
import "./dogs.css";
import FiveStarRating from "../common/five-star-rating/FiveStarRating";
import Table from "../common/filter-table/FilterTable";

function Home() {
  const [dogUrl, setDogUrl] = useState("");
  const [breedsList, setBreedsList] = useState({});

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((response) => {
        setDogUrl(response.message);
      });

    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        setBreedsList(data.message);
      });
  }, []);

  return (
    <div className="Dogs-wrapper">
      <h1 className="title">Dog Ceo Clone</h1>
      {dogUrl && <img src={dogUrl} className="Dogs-dog-image" />}

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

const someData = {
  affenpinscher: [],
  african: [],
  airedale: [
    "subBreed1ubBreed1ubBreed1ubBreed1ubBreed1ubBreed1",
    "Another Breed",
    "avgain",
    "dda",
    "ss",
    "bb",
    "tt",
  ],
  akita: ["subBreed1"],
  appenzeller: [],
  australian: [],
  australiaan: ["a"],
};
