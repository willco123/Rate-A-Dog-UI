import React, { useEffect, useState } from "react";
import "./dogs.css";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating";
import TableComponent from "../../components/table-component/TableComponent";
import { getBreeds, getRandomDogImage } from "../../services/dog-ceo";
import type { Breeds, TableDataJSX, TableData } from "../../types";
import DropDown from "../../components/drop-down/DropDown";
import RadioHideInput from "../../components/radio-hide-input/RadioHideInput";

function Home() {
  const [dogImage, setDogImage] = useState<string>("");
  const [breedsList, setBreedsList] = useState<Breeds>({});
  const [tableData, setTableData] = useState<Omit<TableData, "rating">[]>([]);
  const [tableDataJSX, setTableDataJSX] = useState<
    Omit<TableDataJSX, "rating">[]
  >([]);

  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);

  function showSelection() {
    if (!selectedBreed) return " ";
    const subBreed = selectedSubBreed ? selectedSubBreed : " ";
    const selection = selectedBreed + " " + subBreed;
    return selection;
  }

  const selection = showSelection();

  useEffect(() => {
    (async () => {
      setDogImage(await getRandomDogImage());
      setBreedsList(await getBreeds());
    })();
  }, []);

  useEffect(() => {
    const tableDataFromBreedsList = breedsListToTableData(breedsList);
    setTableData(tableDataFromBreedsList);
  }, [breedsList]);

  useEffect(() => {
    const tableDataJSXFromTableData = tableDataToJSX(tableData);
    setTableDataJSX(tableDataJSXFromTableData);
  }, [tableData]);

  useEffect(() => {
    //basically forcing a re-render here upon changing selected breed
    // selection = showSelection();
    const tableDataJSXFromTableData = tableDataToJSX(tableData);
    setTableDataJSX(tableDataJSXFromTableData);
  }, [selectedBreed]);

  function breedsListToTableData(breedsList: Breeds) {
    const tableDataJSX = Object.entries(breedsList).map((element) => {
      const breed = element[0];
      const subBreed = element[1];
      const tableDataObject = {
        breed: breed,
        subBreed: subBreed,
      };
      return tableDataObject;
    });
    return tableDataJSX;
  }

  function tableDataToJSX(tableData: Omit<TableData, "rating">[]) {
    const tableDataJSX = tableData.map((breedObject, index) => {
      const { breed } = breedObject;
      const breedJSX = setElementAsRadioJSX(breed, "breed", handleRadioChange);
      const subBreedJSX = setSubBreedAsJSX(breedObject, index);

      const outputObject = {
        breed: breedJSX,
        subBreed: subBreedJSX,
      };

      return outputObject;
    });
    return tableDataJSX;
  }

  function setElementAsJSX(
    element: string | number | null,
    id: string,
    key: string | number,
  ) {
    return (
      <td id={id} key={key}>
        {element}
      </td>
    );
  }

  function setSubBreedAsJSX(
    breedObject: Omit<TableData, "rating">,
    index: number,
  ) {
    const subBreedArray = breedObject.subBreed;
    const tableParentElement = breedObject.breed;
    let outputSubBreed: JSX.Element;

    if (subBreedArray.length > 1) {
      outputSubBreed = (
        <DropDown
          items={subBreedArray}
          onChange={(e) => handleDropDownChange(e)}
          isDisabled={isDropDownDisabled(tableParentElement)}
          key={tableParentElement + "subBreed"}
        />
      );
    } else {
      const singleElement = breedObject.subBreed[0];
      outputSubBreed =
        singleElement == null
          ? setElementAsJSX(singleElement, "null", "null")
          : setElementAsJSX(singleElement, singleElement, singleElement);
    }
    return outputSubBreed;
  }

  function setElementAsRadioJSX(
    item: string,
    parentHeader: string,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) {
    return (
      <td id={"Radio"} key={item}>
        {
          <RadioHideInput
            key={item}
            radioGroup={parentHeader}
            item={item}
            onChange={handleRadioChange}
          />
        }
      </td>
    );
  }

  function isDropDownDisabled(breedBeingRendered: string) {
    if (selectedBreed === breedBeingRendered) return true;
    return false;
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
    setSelectedSubBreed(null);
  }

  function handleDropDownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedSubBreed = event.target.value;
    setSelectedSubBreed(newSelectedSubBreed);
  }

  function handleClick() {
    console.log("Search somer stuff init");
  }

  function clearSelection() {
    setSelectedBreed(null);
    setSelectedSubBreed(null);
  }

  return (
    <div className="Dogs-wrapper">
      <h1 className="title">Dog Ceo Clone</h1>
      {dogImage && <img src={dogImage} className="Dogs-dog-image" />}
      <FiveStarRating />
      <span>{selection}</span>
      <span onClick={clearSelection}>Clear</span>
      <TableComponent
        key={"table-component"}
        theadData={["Breed", "Sub-Breed"]}
        tbodyData={tableDataJSX}
      />
      <button onClick={handleClick} className="Dogs-button">
        Get a new Dog!
      </button>
      <button className="Dogs-button">Rate the Dog!</button>
      <button className="Dogs-button">Add to favourites!</button>
    </div>
  );
}

export default Home;
