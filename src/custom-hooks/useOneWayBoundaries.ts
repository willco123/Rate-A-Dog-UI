import { useState, useEffect } from "react";
import getCarouselDistance from "../utils/get-carousel-distance";
import type { MutateArrayData } from "../types";
const useOneWayBoundaries = ({
  firstCarousel,
  secondCarousel,
  mutateArrayData,
  skipCount,
  sampleSize,
  maxSamples,
}: {
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
    if (firstCarousel === null) return;
    if (secondCarousel === null) return;
    if (firstCarouselIndex === null) return;

    if (firstCarouselIndex > 40 && arrayPosition[1] === "first") {
      if (skipCount >= maxSamples) return;
      setArrayPosition(["first", "second"]);
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      mutateArrayData("second", secondCarousel, "right");
      setSecondShiftX(secondShiftX + distance + 15);
      secondCarousel.style.justifyContent = "left";
      //Moving second array to the right
    }
    if (firstCarouselIndex < 10 && arrayPosition[0] === "first") {
      if (skipCount <= sampleSize) return;
      setArrayPosition(["second", "first"]);
      const distance = getCarouselDistance(firstCarousel, secondCarousel);

      mutateArrayData("second", secondCarousel, "left");
      setSecondShiftX(secondShiftX + (distance + 15) * -1);
      secondCarousel.style.justifyContent = "right";
      //moving second array to the left
    }
  }

  function handleSecondBoundary() {
    if (firstCarousel === null) return;
    if (secondCarousel === null) return;
    if (secondCarouselIndex === null) return;

    if (secondCarouselIndex > 40 && arrayPosition[1] === "second") {
      if (skipCount >= maxSamples)
        //moving first array to the right
        setArrayPosition(["second", "first"]);
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      mutateArrayData("first", firstCarousel, "right");
      setFirstShiftX(firstShiftX + distance + 15);
      firstCarousel.style.justifyContent = "left";
    }
    if (secondCarouselIndex < 10 && arrayPosition[0] === "second") {
      //moving first array to the left
      setArrayPosition(["first", "second"]);
      const distance = getCarouselDistance(firstCarousel, secondCarousel);
      mutateArrayData("first", firstCarousel, "left");
      setFirstShiftX(firstShiftX + (distance + 15) * -1);
      firstCarousel.style.justifyContent = "right";
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
