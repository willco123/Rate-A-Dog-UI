import React, { useState, useRef } from "react";
import useIntersectionObserver from "../../custom-hooks/useIntersectionObserver";
import classnames from "classnames";
import type { CarouselData } from "../../types";

export default function CarouselImageContaniner({
  carouselData,
  isAnImageExpanded,
  handleCollapse,
  index,
  handleBoundary,
  parentContainer,
}: {
  carouselData: CarouselData;
  isAnImageExpanded: boolean;
  handleCollapse: ((e: React.MouseEvent<HTMLDivElement>) => void) | undefined;
  index: number;
  handleBoundary: (index: number) => void;
  parentContainer: string;
}) {
  if (carouselData === null)
    return (
      <div
        className="slider-image"
        key={"null" + parentContainer + index}
      ></div>
    );

  const [isVisible, setIsVisible] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: imageRef,
    onIntersect: ([entry], observerElement) => {
      if (entry.isIntersecting) {
        const dataIndex = entry.target.getAttribute("data-index");
        if (dataIndex === null) throw new Error("data-index is null");
        const currentCarouselDataIndex = parseInt(dataIndex);

        handleBoundary(currentCarouselDataIndex);

        if (dataIndex !== index.toString()) return;
        setIsVisible(true);
        // if (!imageRef.current) throw new Error("Image container is undefined");
        // observerElement.unobserve(imageRef.current);
      } else if (entry.isIntersecting === false) {
        setIsVisible(false);
      }
    },
  });

  if (!isAnImageExpanded) handleCollapse = undefined;

  const { breed, subBreed, averageRating, numberOfRates, url, isExpanded } =
    carouselData;
  let isAnImageExpandedCopy = isAnImageExpanded;
  if (isExpanded) isAnImageExpandedCopy = false;

  return (
    <div
      className={classnames("slider-image")}
      ref={imageRef}
      data-index={index}
    >
      {isVisible && (
        <img
          className={classnames({
            expanded: isExpanded,
            "another-image-expanded": isAnImageExpandedCopy,
          })}
          src={url}
          alt={breed}
          draggable={false}
          data-breed={breed}
          data-subbreed={subBreed}
          data-averagerating={averageRating}
          data-votes={numberOfRates}
          onClick={handleCollapse}
        />
      )}
    </div>
  );
}
