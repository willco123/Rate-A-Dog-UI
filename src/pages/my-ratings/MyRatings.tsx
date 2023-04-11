import React, { useEffect, useState, useMemo } from "react";
import { useMyRatingsDataInit } from "../../custom-hooks/useMyRatingsDataInit.js";
import Table from "../../components/table-component/TableComponent.js";
import Pagination from "../../components/pagination/Pagination.js";

import "./my-ratings.scss";

export default function MyRatings() {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedBreedUrls, setSelectedBreedUrls] = useState<(string | null)[]>(
    [null],
  );
  const [selectedBreedUrl, setSelectedBreedUrl] = useState<string | null>(null);

  const {
    userRatingData,
    userRatingTableData,
    userRatingTableDataJSX,
    activeSubBreedUrl,
    setUserRatingTableData,
    setActiveSubBreedUrl,
  } = useMyRatingsDataInit(
    handleRadioChange,
    handleSubBreedDropDownChange,
    handleUrlDropDownChange,
  );

  const itemsPerPage = 5;

  const currentTableDataJSX = useMemo(() => {
    if (!userRatingTableDataJSX) return [];
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return userRatingTableDataJSX.length
      ? userRatingTableDataJSX.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [currentPage, userRatingTableDataJSX]);

  useEffect(() => {
    setDogImage(selectedBreedUrls[0]);
  }, [selectedBreedUrls]);

  useEffect(() => {
    setDogImage(selectedBreedUrl);
  }, [selectedBreedUrl]);

  useEffect(() => {
    if (selectedBreed === null) return;

    const associatedSubBreed = activeSubBreedUrl.find((element) => {
      return element.breed === selectedBreed;
    });

    const subBreedUrlRatings = userRatingData.find((element) => {
      return (
        element.breed === selectedBreed &&
        element.subBreed == associatedSubBreed?.activeSubBreed
      );
    });
    if (!subBreedUrlRatings) throw new Error("breedObject is undefined");
    const urls = subBreedUrlRatings.urlRatings.map((element) => element[1]);
    setSelectedBreedUrls(urls);
  }, [selectedBreed, activeSubBreedUrl]);

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedBreed = event.target.value;
    setSelectedBreed(newSelectedBreed);
  }

  function handleSubBreedDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
    currentTableDataRowIndex: number,
  ) {
    const selectedSubBreed = e.target.value;
    const associatedBreed = tableRowId;
    const activeSubBreedUrlClone = [...activeSubBreedUrl];
    const activeObject = activeSubBreedUrlClone.find(
      (element) => element.breed == associatedBreed,
    );
    if (!activeObject) throw new Error("breed is undefined");
    activeObject.activeSubBreed = selectedSubBreed;

    setActiveSubBreedUrl(activeSubBreedUrlClone);

    const userRatings = userRatingData.find((element) => {
      return (
        element.breed === associatedBreed &&
        element.subBreed == selectedSubBreed
      );
    });

    if (!userRatings) throw new Error("breedObject is undefined");
    const urls = userRatings.urlRatings.map((element) => element[1]);
    setSelectedBreedUrls(urls);

    const associatedBreedRating = userRatings.urlRatings[0][0]; //first rating of the first url
    const userRatingTableDataClone = userRatingTableData.map((element) => {
      return { ...element };
    });
    userRatingTableDataClone[currentTableDataRowIndex].urlRating =
      associatedBreedRating;
    userRatingTableDataClone[currentTableDataRowIndex].urls = urls;
    setUserRatingTableData(userRatingTableDataClone);
  }

  function handleUrlDropDownChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    tableRowId: string,
    currentTableDataRowIndex: number,
  ) {
    const selectedUrl = e.target.value;
    const associatedBreed = tableRowId;
    const activeSubBreedUrlClone = [...activeSubBreedUrl];
    const activeObject = activeSubBreedUrlClone.find(
      (element) => element.breed == associatedBreed,
    );
    if (!activeObject) throw new Error("breed is undefined");
    activeObject.url = selectedUrl;

    // setActiveSubBreedUrl(activeSubBreedUrlClone);

    const associatedRating = (() => {
      for (let element of userRatingData) {
        for (let urlRating of element.urlRatings) {
          if (urlRating[1] === selectedUrl) {
            return urlRating[0];
          }
        }
      }
    })();

    if (associatedRating === undefined)
      throw new Error("associatedRating is undefined");

    const userRatingTableDataClone = userRatingTableData.map((element) => {
      return { ...element };
    });
    userRatingTableDataClone[currentTableDataRowIndex].urlRating =
      associatedRating;
    setUserRatingTableData(userRatingTableDataClone);
    setSelectedBreedUrl(selectedUrl);
  }
  return (
    <div className="my-ratings">
      <div className="title">My Ratings</div>
      {dogImage && (
        <div className="image-container">
          <img src={dogImage} className="dog-image" />
        </div>
      )}
      <Table
        tbodyData={currentTableDataJSX}
        theadData={["Breed", "SubBreed", "Urls", "Rating"]}
      />
      {userRatingTableData && (
        <Pagination
          dataLength={userRatingTableData.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
