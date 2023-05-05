import React, { useEffect, useState, useRef } from "react";

import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer";
import type { CarouselData, MutateHomeData } from "../../types.js";
import "./two-way-carousel.scss";
import useDragCarousel from "../../custom-hooks/useDragCarousel";
import useTwoWayBoundaries from "../../custom-hooks/useTwoWayBoundaries";

export default function TwoWayCarousel({
  carouselDataFirst,
  carouselDataSecond,
  selectedImageHTML,
  isAnImageExpanded,
  mutateHomeData,
  setSelectedImageHTML,
  setIsAnImageExpanded,
}: {
  carouselDataFirst: CarouselData[];
  carouselDataSecond: CarouselData[];
  selectedImageHTML: HTMLImageElement | undefined;
  isAnImageExpanded: boolean;
  setSelectedImageHTML: React.Dispatch<
    React.SetStateAction<HTMLImageElement | undefined>
  >;
  mutateHomeData: MutateHomeData;
  setIsAnImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const snapAreaRef = useRef<HTMLDivElement>(null);
  const parentCarouselRef = useRef<HTMLDivElement>(null);
  const firstCarouselRef = useRef<HTMLDivElement>(null);
  const secondCarouselRef = useRef<HTMLDivElement>(null);
  const parentCarousel = parentCarouselRef.current;
  const firstCarousel = firstCarouselRef.current;
  const secondCarousel = secondCarouselRef.current;
  const snapArea = snapAreaRef.current;

  const { mouseX, handleMouseDown } = useDragCarousel({
    parentCarousel,
    firstCarousel,
    secondCarousel,
    snapArea,
    isAnImageExpanded,
    setSelectedImageHTML,
  });
  const {
    firstShiftX,
    secondShiftX,
    setFirstCarouselIndex,
    setSecondCarouselIndex,
  } = useTwoWayBoundaries({ firstCarousel, secondCarousel, mutateHomeData });

  return (
    <div>
      <div className="two-way-chosen-image" ref={snapAreaRef}>
        <div
          className={classnames("two-way-expand-image", {
            expanded:
              (isAnImageExpanded && selectedImageHTML) ||
              (!isAnImageExpanded && !selectedImageHTML),
          })}
          onClick={() => setIsAnImageExpanded(true)}
        />
      </div>
      <div
        key="two-way-carousel-container"
        className="two-way-carousel-container"
        style={{
          transform: `translate(${mouseX}px, 35%)`,
        }}
        ref={parentCarouselRef}
      >
        <div
          key="first-carousel"
          ref={firstCarouselRef}
          className={classnames("slider-image-container first", {
            expanded: isAnImageExpanded,
          })}
          style={{
            transform: `translate(${firstShiftX}px, 0%)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {carouselDataFirst.map((element, index) => {
            const key = element ? element.url : index + "null";
            return (
              <CarouselImageContaniner
                carouselData={element}
                index={index}
                parentContainer="first"
                isAnImageExpanded={isAnImageExpanded}
                setIndex={setFirstCarouselIndex}
                setIsImageExpanded={setIsAnImageExpanded}
                key={key} //may need to add arraypos here for re-render
              />
            );
          })}
        </div>

        <div
          key="second-carousel123"
          ref={secondCarouselRef}
          className={classnames("slider-image-container second", {
            expanded: isAnImageExpanded,
          })}
          style={{
            transform: `translate(${secondShiftX}px, 0%)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {carouselDataSecond.map((element, index) => {
            const key = element ? element.url : index + "null";
            return (
              <CarouselImageContaniner
                carouselData={element}
                index={index}
                parentContainer="second"
                isAnImageExpanded={isAnImageExpanded}
                setIndex={setSecondCarouselIndex}
                setIsImageExpanded={setIsAnImageExpanded}
                key={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
