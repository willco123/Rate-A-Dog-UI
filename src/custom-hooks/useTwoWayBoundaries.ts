import { useState, useEffect } from "react";
import { getCarouselWidth } from "../utils/get-carousel-distance";
import type { MutateHomeData } from "../types";
const useTwoWayBoundaries = ({
  firstCarousel,
  secondCarousel,
  mutateHomeData,
}: {
  firstCarousel: HTMLDivElement | null;
  secondCarousel: HTMLDivElement | null;
  mutateHomeData: MutateHomeData;
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
      setArrayPosition(["first", "second"]);
      const distance = getCarouselWidth(firstCarousel, secondCarousel);
      mutateHomeData("second", secondCarousel);
      setSecondShiftX(secondShiftX + distance + 15);
      secondCarousel.style.justifyContent = "left";
      //Moving second array to the right
    }
    if (firstCarouselIndex < 10 && arrayPosition[0] === "first") {
      setArrayPosition(["second", "first"]);
      const distance = getCarouselWidth(firstCarousel, secondCarousel);

      mutateHomeData("second", secondCarousel);
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
      //moving first array to the right
      setArrayPosition(["second", "first"]);
      const distance = getCarouselWidth(firstCarousel, secondCarousel);
      mutateHomeData("first", firstCarousel);
      setFirstShiftX(firstShiftX + distance + 15);
      firstCarousel.style.justifyContent = "left";
    }
    if (secondCarouselIndex < 10 && arrayPosition[0] === "second") {
      //moving first array to the left
      setArrayPosition(["first", "second"]);
      const distance = getCarouselWidth(firstCarousel, secondCarousel);
      mutateHomeData("first", firstCarousel);
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

export default useTwoWayBoundaries;
