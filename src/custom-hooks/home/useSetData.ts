import { useEffect, useState } from "react";
import type { CarouselData, UrlRatingData } from "../../types";
import { formatCarouselData } from "../../utils/format-data/carousel-data";
import { getAllDbDogs, getMoreDbDogs } from "../../services/backend/dogs";

const useSetData = ({ sampleSize }: { sampleSize: number }) => {
  const [homeData, setHomeData] = useState<UrlRatingData[]>([]);
  const [firstArrayData, setFirstArrayData] = useState<UrlRatingData[]>([]);
  const [secondArrayData, setSecondArrayData] = useState<UrlRatingData[]>([]);
  const [carouselDataFirst, setCarouselDataFirst] = useState<
    CarouselData[] | []
  >([]);
  const [carouselDataSecond, setCarouselDataSecond] = useState<
    CarouselData[] | []
  >([]);
  const [chosenRating, setChosenRating] = useState<number | null>(null);
  const sliceIndex = Math.floor(sampleSize / 2);

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

  useEffect(() => {
    const carouselData = formatCarouselData(firstArrayData);
    setCarouselDataFirst(carouselData);
  }, [firstArrayData]);

  useEffect(() => {
    const carouselData = formatCarouselData(secondArrayData);
    setCarouselDataSecond(carouselData);
  }, [secondArrayData]);

  async function mutateHomeData(
    targetArray: "first" | "second",
    carousel: HTMLDivElement,
  ) {
    const sliceIndex = Math.floor(sampleSize / 2);
    const moreDogs = await getMoreDbDogs(sliceIndex, homeData);

    if (targetArray === "first") {
      const homeDataClone = [...moreDogs, ...homeData.slice(sliceIndex)];
      setHomeData(homeDataClone);
    }
    if (targetArray === "second") {
      const homeDataClone = [...homeData.slice(0, sliceIndex), ...moreDogs];
      setHomeData(homeDataClone);
    }

    const totalImageLength = moreDogs.length * 300;
    const gapLength = (moreDogs.length - 1) * 5;
    carousel.style.width = `${totalImageLength + gapLength}px`;
  }

  return {
    homeData,
    sampleSize,
    chosenRating,
    carouselDataFirst,
    carouselDataSecond,
    setHomeData,
    mutateHomeData,
    setChosenRating,
    setCarouselDataFirst,
    setCarouselDataSecond,
  };
};

export default useSetData;
