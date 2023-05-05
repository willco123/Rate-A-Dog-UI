import { useState, useEffect } from "react";
import { getCarouselDistance } from "../utils/get-carousel-distance";
import type { MutateArrayData } from "../types";
const useOneWayBoundaries = ({
  parentCarousel,
  firstCarousel,
  secondCarousel,
  mutateArrayData,
  skipCount,
  sampleSize,
  maxSamples,
}: {
  parentCarousel: HTMLDivElement | null;
  firstCarousel: HTMLDivElement | null;
  secondCarousel: HTMLDivElement | null;
  mutateArrayData: MutateArrayData;
  skipCount: number;
  sampleSize: number;
  maxSamples: number;
}) => {
  const [firstCarouselIndex, setFirstCarouselIndex] = useState<number | null>(
    null,
  );
  const [secondCarouselIndex, setSecondCarouselIndex] = useState<number | null>(
    null,
  );
  const [arrayPosition, setArrayPosition] = useState<string[]>([
    "first",
    "second",
  ]);
  const [firstShiftX, setFirstShiftX] = useState<number>(0);
  const [secondShiftX, setSecondShiftX] = useState<number>(0);

  useEffect(() => {
    handleFirstBoundary();
  }, [firstCarouselIndex]);
  useEffect(() => {
    handleSecondBoundary();
  }, [secondCarouselIndex]);

  async function handleFirstBoundary() {
    if (parentCarousel === null) return;
    if (firstCarousel === null) return;
    if (secondCarousel === null) return;
    if (firstCarouselIndex === null) return;

    if (firstCarouselIndex > 40 && arrayPosition[1] === "first") {
      if (skipCount + 50 >= maxSamples) return;
      setArrayPosition(["first", "second"]);
      const secondContainerWidth = await mutateArrayData("second", "right");
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      const newShiftDistance = distance + secondContainerWidth;
      setSecondShiftX(secondShiftX + newShiftDistance);

      //Moving second array to the right
    }
    if (firstCarouselIndex < 10 && arrayPosition[0] === "first") {
      if (skipCount + 50 <= sampleSize) return;
      setArrayPosition(["second", "first"]);
      const secondContainerWidth = await mutateArrayData("second", "left");
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      const newShiftDistance = distance + secondContainerWidth;
      setSecondShiftX(secondShiftX + newShiftDistance * -1);
      //moving second array to the left
    }
  }

  async function handleSecondBoundary() {
    if (firstCarousel === null) return;
    if (secondCarousel === null) return;
    if (parentCarousel === null) return;
    if (secondCarouselIndex === null) return;

    if (secondCarouselIndex > 40 && arrayPosition[1] === "second") {
      if (skipCount + 50 >= maxSamples) return;
      //moving first array to the right
      setArrayPosition(["second", "first"]);
      const firstContainerWidth = await mutateArrayData("first", "right");
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      const newShiftDistance = distance + firstContainerWidth;
      setFirstShiftX(firstShiftX + newShiftDistance);
    }
    if (secondCarouselIndex < 10 && arrayPosition[0] === "second") {
      //moving first array to the left
      setArrayPosition(["first", "second"]);
      const firstContainerWidth = await mutateArrayData("first", "left");
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      const newShiftDistance = distance + firstContainerWidth;
      setFirstShiftX(firstShiftX + newShiftDistance * -1);
    }
  }

  return {
    firstShiftX,
    secondShiftX,
    setFirstCarouselIndex,
    setSecondCarouselIndex,
  };
};

export default useOneWayBoundaries;
