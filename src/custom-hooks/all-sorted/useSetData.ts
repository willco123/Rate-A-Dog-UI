import { useEffect, useState } from "react";
import type { CarouselData, UrlRatingData, SortTypes } from "../../types.js";
import { formatCarouselData } from "../../utils/format-data/carousel-data.js";
import {
  getFilteredCount,
  getAllSorted,
  getCount,
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
  const [sortedData, setSortedData] = useState<UrlRatingData[]>([]);
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
        const currentCount = await getFilteredCount(filteredBreed);
        setMaxSamples(currentCount);
      } else {
        const currentCount = await getCount();
        setMaxSamples(currentCount);
      }
      setSkipCount(sampleSize / 2);
      const dbDogs = await getAllSorted(
        sortOrder,
        sortMode,
        0,
        sampleSize,
        filteredBreed,
      );
      setSortedData(dbDogs);
    })();
  }, [sortMode, filteredBreed, sortOrder]);

  useEffect(() => {
    const firstSlice = sortedData.slice(0, sliceIndex);
    const secondSlice = sortedData.slice(sliceIndex);
    setFirstArrayData(firstSlice);
    setSecondArrayData(secondSlice);
  }, [sortedData]);

  useEffect(() => {
    const carouselData = formatCarouselData(firstArrayData);
    setCarouselDataFirst(carouselData);
    setFirstContainerWidth(calcContainerWidth(carouselData.length, 5, 300));
  }, [firstArrayData]);

  useEffect(() => {
    const carouselData = formatCarouselData(secondArrayData);
    setCarouselDataSecond(carouselData);
    setSecondContainerWidth(calcContainerWidth(carouselData.length, 5, 300));
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

  async function mutateSortedData(
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

    const moreDogs = await getAllSorted(
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
      const sortedDataClone = [...moreDogs, ...sortedData.slice(sliceIndex)];
      setSliceIndex(moreDogs.length);
      setSortedData(sortedDataClone);
      setFirstContainerWidth(containerLength);
      return secondContainerWidth;
    } else {
      const sortedDataClone = [...sortedData.slice(0, sliceIndex), ...moreDogs];
      setSliceIndex(100 - moreDogs.length);
      setSortedData(sortedDataClone);
      setSecondContainerWidth(containerLength);
      return firstContainerWidth;
    }
  }
  return {
    sortedData,
    carouselDataFirst,
    carouselDataSecond,
    skipCount,
    maxSamples,
    mutateSortedData,
    setSortedData,
    setCarouselDataFirst,
    setCarouselDataSecond,
  };
};

export default useSetData;
