import React, { useRef } from "react";
import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer.js";
import type { CarouselData, MutateArrayData } from "../../types.js";
import "./carousel.scss";
import useDragCarousel from "../../custom-hooks/useDragCarousel.js";
import useOneWayBoundaries from "../../custom-hooks/useOneWayBoundaries.js";
import useDragCarouselTouch from "../../custom-hooks/useDragCarouselTouch.js";

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

  const { mouseX, handleMouseDown } = useDragCarousel({
    parentCarousel,
    firstCarousel,
    secondCarousel,
    snapArea,
    isAnImageExpanded,
    setSelectedImageHTML,
  });

  const { touchX, handleTouchStart } = useDragCarouselTouch({
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
      <div className="chosen-image" ref={snapAreaRef}>
        <div
          className={classnames("expand-image", {
            expanded:
              (isAnImageExpanded && selectedImageHTML) ||
              (!isAnImageExpanded && !selectedImageHTML),
          })}
          onClick={() => setIsAnImageExpanded(true)}
          data-testid="expand-image"
        />
      </div>
      <div
        key="carousel-container"
        className="carousel-container"
        draggable={false}
        style={{
          transform: `translate(${mouseX + touchX}px, 35%)`,

          // right: isSorted ? `0%` : `50%`,
        }}
        ref={parentCarouselRef}
      >
        <div
          key="first-carousel"
          draggable={false}
          ref={firstCarouselRef}
          className={classnames("slider-image-container first", {
            expanded: isAnImageExpanded,
          })}
          style={{
            transform: `translate(${firstShiftX}px, 0%)`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
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
          draggable={false}
          ref={secondCarouselRef}
          className={classnames("slider-image-container second", {
            expanded: isAnImageExpanded,
          })}
          style={{
            transform: `translate(${secondShiftX}px, 0%)`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
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
