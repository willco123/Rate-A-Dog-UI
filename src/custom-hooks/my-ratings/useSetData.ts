import { useEffect, useState } from "react";
import type { CarouselData, UrlRatingData, SortTypes } from "../../types.js";
import { formatCarouselData } from "../../utils/format-data/carousel-data.js";
import {
  getUserFilteredCount,
  getUserDbDogs,
  getUserCount,
} from "../../services/backend/dogs.js";

const useSetData = ({
  sampleSize,
  sortMode,
  sortOrder,
  filteredBreed,
  scrollDir,
  setScrollDir,
}: {
  sampleSize: number;
  sortMode: SortTypes;
  sortOrder: "asc" | "desc";
  filteredBreed: { breed: string; subBreed: string | null } | undefined;
  scrollDir: "left" | "right";
  setScrollDir: React.Dispatch<React.SetStateAction<"left" | "right">>;
}) => {
  const [userData, setUserData] = useState<UrlRatingData[]>([]);
  const [firstArrayData, setFirstArrayData] = useState<UrlRatingData[]>([]);
  const [secondArrayData, setSecondArrayData] = useState<UrlRatingData[]>([]);
  const [carouselDataFirst, setCarouselDataFirst] = useState<
    CarouselData[] | []
  >([]);
  const [carouselDataSecond, setCarouselDataSecond] = useState<
    CarouselData[] | []
  >([]);
  const [maxSamples, setMaxSamples] = useState<number>(0);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [sliceIndex, setSliceIndex] = useState<number>(
    Math.floor(sampleSize / 2),
  );
  const [firstContainerWidth, setFirstContainerWidth] = useState<number>(0);
  const [secondContainerWidth, setSecondContainerWidth] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (filteredBreed) {
        const currentCount = await getUserFilteredCount(filteredBreed);
        setMaxSamples(currentCount);
      } else {
        const currentCount = await getUserCount();
        setMaxSamples(currentCount);
      }
      setSkipCount(sampleSize / 2);
      const dbDogs = await getUserDbDogs(
        sortOrder,
        sortMode,
        0,
        sampleSize,
        filteredBreed,
      );
      setUserData(dbDogs);
    })();
  }, [sortMode, filteredBreed, sortOrder]);

  useEffect(() => {
    const firstSlice = userData.slice(0, sliceIndex);
    const secondSlice = userData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [userData]);

  useEffect(() => {
    const carouselData = formatCarouselData(firstArrayData);
    setFirstContainerWidth(calcContainerWidth(carouselData.length, 5, 300));
    setCarouselDataFirst(carouselData);
  }, [firstArrayData]);

  useEffect(() => {
    const carouselData = formatCarouselData(secondArrayData);
    setSecondContainerWidth(calcContainerWidth(carouselData.length, 5, 300));
    setCarouselDataSecond(carouselData);
  }, [secondArrayData]);

  function calcContainerWidth(
    numberOfImages: number,
    gapSize: number,
    imageWidth: number,
  ) {
    const totalGapSize = numberOfImages * gapSize;
    const totalImageWidth = numberOfImages * imageWidth;
    return totalGapSize + totalImageWidth;
  }

  async function mutateUserData(
    targetArray: "first" | "second",
    direction: "left" | "right",
  ) {
    let newSkipCount: number = 0;
    if (direction === "left" && scrollDir === "left")
      newSkipCount = skipCount - 50;
    if (direction === "left" && scrollDir === "right") {
      newSkipCount = skipCount - 100;
    }
    if (direction === "right" && scrollDir === "right")
      newSkipCount = skipCount + 50;
    if (direction === "right" && scrollDir === "left")
      newSkipCount = skipCount + 100;

    const moreDogs = await getUserDbDogs(
      sortOrder,
      sortMode,
      newSkipCount,
      50,
      filteredBreed,
    );
    setScrollDir(direction);
    setSkipCount(newSkipCount);
    const containerLength = calcContainerWidth(moreDogs.length, 5, 300);

    if (targetArray === "first") {
      const userDataClone = [...moreDogs, ...userData.slice(sliceIndex)];
      setSliceIndex(moreDogs.length);
      setUserData(userDataClone);
      setFirstContainerWidth(containerLength);
      return secondContainerWidth;
    } else {
      const userDataClone = [...userData.slice(0, sliceIndex), ...moreDogs];
      setSliceIndex(100 - moreDogs.length);
      setUserData(userDataClone);
      setSecondContainerWidth(containerLength);
      return firstContainerWidth;
    }
  }
  return {
    userData,
    carouselDataFirst,
    carouselDataSecond,
    skipCount,
    maxSamples,
    mutateUserData,
    setUserData,
    setCarouselDataFirst,
    setCarouselDataSecond,
  };
};

export default useSetData;
