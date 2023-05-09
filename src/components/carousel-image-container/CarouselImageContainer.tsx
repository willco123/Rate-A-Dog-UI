import React, { useState, useRef } from "react";
import useIntersectionObserver from "../../custom-hooks/useIntersectionObserver.js";
import classnames from "classnames";
import type { CarouselData } from "../../types.js";

export default function CarouselImageContaniner({
  carouselData,
  index,
  parentContainer,
  isAnImageExpanded,
  setIsImageExpanded,
  setIndex,
}: {
  carouselData: CarouselData;
  index: number;
  parentContainer: "first" | "second";
  isAnImageExpanded: boolean;
  setIsImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  if (carouselData === null) {
    return (
      <div
        className="slider-image"
        key={"null" + parentContainer + index}
      ></div>
    );
  }

  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: imageRef,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting) {
        const dataIndex = entry.target.getAttribute("data-index");
        if (dataIndex === null) throw new Error("data-index is null");
        const currentCarouselDataIndex = parseInt(dataIndex);
        setIndex(currentCarouselDataIndex);
        if (dataIndex !== index.toString()) return;
        setIsVisible(true);
      } else if (entry.isIntersecting === false) {
        setIsVisible(false);
      }
    },
  });

  const {
    breed,
    subBreed,
    averageRating,
    myRating,
    numberOfRates,
    url,
    isExpanded,
  } = carouselData;

  let isAnImageExpandedCopy = isAnImageExpanded;
  if (isExpanded) isAnImageExpandedCopy = false;

  return (
    <div
      className={classnames("slider-image")}
      ref={imageRef}
      data-index={index}
      data-carousel={parentContainer}
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
          data-numberofrates={numberOfRates}
          data-myrating={myRating}
          onClick={() => setIsImageExpanded(false)}
        />
      )}
    </div>
  );
}
