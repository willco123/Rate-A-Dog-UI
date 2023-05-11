import React, { useRef } from "react";

import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer.js";
import type { CarouselData, MutateHomeData } from "../../types.js";
import "./two-way-carousel.scss";
import useDragCarousel from "../../custom-hooks/useDragCarousel.js";
import useTwoWayBoundaries from "../../custom-hooks/useTwoWayBoundaries.js";
import useDragCarouselTouch from "../../custom-hooks/useDragCarouselTouch.js";

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
        draggable={false}
        key="two-way-carousel-container"
        className="two-way-carousel-container"
        style={{
          transform: `translate(${mouseX + touchX}px, 35%)`,
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
          onTouchStart={handleTouchStart}
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
          draggable={false}
          key="second-carousel123"
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
