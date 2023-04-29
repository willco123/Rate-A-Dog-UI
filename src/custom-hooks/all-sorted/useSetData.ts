import { useEffect, useState } from "react";
import type { CarouselData, UrlRatingData, SortTypes } from "../../types";
import { formatCarouselData } from "../../utils/format-data/carousel-data";
import {
  getFilteredCount,
  getAllSorted,
  getCount,
} from "../../services/backend/dogs";

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
  const sliceIndex = Math.floor(sampleSize / 2);

  useEffect(() => {
    (async () => {
      if (filteredBreed) {
        const currentCount = await getFilteredCount(filteredBreed);
        setMaxSamples(currentCount);
      } else {
        const currentCount = await getCount();
        setMaxSamples(currentCount);
      }
      setSkipCount(sampleSize);
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
  }, [firstArrayData]);

  useEffect(() => {
    const carouselData = formatCarouselData(secondArrayData);
    setCarouselDataSecond(carouselData);
  }, [secondArrayData]);

  async function mutateSortedData(
    targetArray: "first" | "second",
    carousel: HTMLDivElement,
    direction: "left" | "right",
  ) {
    if (skipCount === null) return;
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

    if (targetArray === "first") {
      const sortedDataClone = [...moreDogs, ...sortedData.slice(sliceIndex)];
      setSortedData(sortedDataClone);
    }
    if (targetArray === "second") {
      const sortedDataClone = [...sortedData.slice(0, sliceIndex), ...moreDogs];
      setSortedData(sortedDataClone);
    }

    const totalImageLength = moreDogs.length * 300;
    const gapLength = (moreDogs.length - 1) * 5;
    carousel.style.width = `${totalImageLength + gapLength}px`;
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
