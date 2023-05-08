import React, { useState, useEffect } from "react";
import parseStringToNumber from "../utils/parseStringToNumber.js";
import type { CarouselData } from "../types.js";

const useImageExpansion = ({
  selectedImageHTML,
  carouselDataFirst,
  carouselDataSecond,
  setCarouselDataFirst,
  setCarouselDataSecond,
}: {
  selectedImageHTML: HTMLImageElement | undefined;
  carouselDataFirst: CarouselData[];
  carouselDataSecond: CarouselData[];
  setCarouselDataFirst: React.Dispatch<React.SetStateAction<CarouselData[]>>;
  setCarouselDataSecond: React.Dispatch<React.SetStateAction<CarouselData[]>>;
}) => {
  const [isAnImageExpanded, setIsAnImageExpanded] = useState(false);

  useEffect(() => {
    if (isAnImageExpanded) {
      handleExpand();
    } else handleCollapse();
  }, [isAnImageExpanded]);

  const handleExpand = () => {
    if (!selectedImageHTML) return;
    const imageContainer = selectedImageHTML.parentElement;
    if (!imageContainer) return;
    const carousel = imageContainer.dataset.carousel as "first" | "second";
    const indexString = imageContainer.dataset.index as string;
    const index = parseStringToNumber(indexString);
    if (carousel === "first") {
      const carouselDataFirstClone = [...carouselDataFirst];
      carouselDataFirstClone[index].isExpanded = true;
      setCarouselDataFirst(carouselDataFirstClone);
    }
    if (carousel === "second") {
      const carouselDataSecondClone = [...carouselDataSecond];
      carouselDataSecondClone[index].isExpanded = true;
      setCarouselDataSecond(carouselDataSecondClone);
    }

    setIsAnImageExpanded(true);
  };

  const handleCollapse = () => {
    if (!selectedImageHTML) return;
    const imageContainer = selectedImageHTML.parentElement;
    if (!imageContainer) return;
    const carousel = imageContainer.dataset.carousel as "first" | "second";
    const indexString = imageContainer.dataset.index as string;
    const index = parseStringToNumber(indexString);

    if (carousel === "first") {
      const carouselDataFirstClone = [...carouselDataFirst];
      carouselDataFirstClone[index].isExpanded = false;
      setCarouselDataFirst(carouselDataFirstClone);
    }
    if (carousel === "second") {
      const carouselDataSecondClone = [...carouselDataSecond];
      carouselDataSecondClone[index].isExpanded = false;
      setCarouselDataSecond(carouselDataSecondClone);
    }
    setIsAnImageExpanded(false);
  };
  return { isAnImageExpanded, setIsAnImageExpanded };
};

export default useImageExpansion;
