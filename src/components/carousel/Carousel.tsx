import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer";
import type { CarouselData, MutateArrayData } from "../../types.js";
import "./carousel.scss";
import useDragCarousel from "../../custom-hooks/useDragCarousel";
import useOneWayBoundaries from "../../custom-hooks/useOneWayBoundaries";

export default function Carousel({
  carouselDataFirst,
  carouselDataSecond,
  selectedImageHTML,
  isAnImageExpanded,
  mutateArrayData,
  setSelectedImageHTML,
  setIsAnImageExpanded,
  maxSamples,
  skipCount,
  sampleSize,
}: {
  carouselDataFirst: CarouselData[];
  carouselDataSecond: CarouselData[];
  selectedImageHTML: HTMLImageElement | undefined;
  isAnImageExpanded: boolean;
  setSelectedImageHTML: React.Dispatch<
    React.SetStateAction<HTMLImageElement | undefined>
  >;
  mutateArrayData: MutateArrayData;
  setIsAnImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  maxSamples: number;
  skipCount: number;
  sampleSize: number;
}) {
  const snapAreaRef = useRef<HTMLDivElement>(null);
  const parentCarouselRef = useRef<HTMLDivElement>(null);
  const firstCarouselRef = useRef<HTMLDivElement>(null);
  const secondCarouselRef = useRef<HTMLDivElement>(null);
  const parentCarousel = parentCarouselRef.current;
  const firstCarousel = firstCarouselRef.current;
  const secondCarousel = secondCarouselRef.current;
  const snapArea = snapAreaRef.current;

  const { mouseX, handleMouseDown, jumpLeft, jumpRight } = useDragCarousel({
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
    firstLeft,
    firstRight,
    secondLeft,
    secondRight,
  } = useOneWayBoundaries({
    parentCarousel,
    firstCarousel,
    secondCarousel,
    mutateArrayData,
    maxSamples,
    skipCount,
    sampleSize,
  });

  return (
    <div>
      <button
        style={{ position: "absolute", top: "200px", zIndex: 1000 }}
        onClick={jumpLeft}
      >
        Left
      </button>
      <button
        onClick={jumpRight}
        style={{ position: "absolute", top: "300px", zIndex: 1000 }}
      >
        Right
      </button>
      <button
        style={{ position: "absolute", top: "100px", zIndex: 1000 }}
        onClick={firstLeft}
      >
        firstLeft
      </button>
      <button
        onClick={firstRight}
        style={{
          position: "absolute",
          top: "100px",
          left: "100px",
          zIndex: 1000,
        }}
      >
        firstRight
      </button>
      <button
        style={{ position: "absolute", top: "150px", zIndex: 1000 }}
        onClick={secondLeft}
      >
        secondLeft
      </button>
      <button
        onClick={secondRight}
        style={{
          position: "absolute",
          top: "150px",
          left: "100px",
          zIndex: 1000,
        }}
      >
        secondRight
      </button>
      <div className="chosen-image" ref={snapAreaRef}>
        <div
          className={classnames("expand-image", {
            expanded:
              (isAnImageExpanded && selectedImageHTML) ||
              (!isAnImageExpanded && !selectedImageHTML),
          })}
          onClick={() => setIsAnImageExpanded(true)}
        />
      </div>
      <div
        key="carousel-container"
        className="carousel-container"
        style={{
          transform: `translate(${mouseX}px, 35%)`,
          // right: isSorted ? `0%` : `50%`,
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
          key="second-carousel"
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
                parentContainer="first"
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
