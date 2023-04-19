import React, { useEffect, useState, useRef } from "react";
import { formatCarouselData } from "../../utils/format-data/carousel-data";
import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer";
import type { CarouselData, UrlRatingData } from "../../types.js";
import "./carousel.scss";

export default function Carousel({
  firstArrayData,
  secondArrayData,
  setSelectedImageData,
  mutateArrayData,
}: {
  firstArrayData: UrlRatingData[];
  secondArrayData: UrlRatingData[];
  setSelectedImageData: (
    selectedBreed: string | undefined,
    selectedSubBreed: string | null | undefined,
    averageRating: number | null | undefined,
    url: string | undefined,
  ) => void;
  mutateArrayData: (
    targetArray: "first" | "second",
    carousel: HTMLDivElement,
  ) => void;
}) {
  const [firstCarouselWidth, setFirstCarouselWidth] = useState<number>(0);
  const [secondCarouselWidth, setSecondCarouselWidth] = useState<number>(0);
  const [arrayPosition, setArrayPosition] = useState<string[]>([
    "first",
    "second",
  ]);

  const [firstShiftX, setFirstShiftX] = useState<number>(0);
  const [secondShiftX, setSecondShiftX] = useState<number>(0);

  const [carouselDataFirst, setCarouselDataFirst] = useState<
    CarouselData[] | []
  >([]);
  const [carouselDataSecond, setCarouselDataSecond] = useState<
    CarouselData[] | []
  >([]);

  const [isAnImageExpanded, setIsAnImageExpanded] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [initialMousePos, setInitialMousePos] = useState(0);
  const [selectedImageHTML, setSelectedImageHTML] = useState<
    HTMLImageElement | undefined
  >(undefined);

  const snapRefObject = useRef<HTMLDivElement>(null);
  const carouselRefObject = useRef<HTMLDivElement>(null);
  const firstCarouselRef = useRef<HTMLDivElement>(null);
  const secondCarouselRef = useRef<HTMLDivElement>(null);
  const carousel = carouselRefObject.current;
  const firstCarousel = firstCarouselRef.current;
  const secondCarousel = secondCarouselRef.current;

  useEffect(() => {
    const carouselData = formatCarouselData(firstArrayData);
    setCarouselDataFirst(carouselData);
  }, [firstArrayData]);

  useEffect(() => {
    const carouselData = formatCarouselData(secondArrayData);
    setCarouselDataSecond(carouselData);
  }, [secondArrayData]);

  // useEffect(() => {
  //   const nummberOfImages = carouselDataFirst.length;
  //   if (firstCarousel === null) return;
  //   firstCarousel.style.width = `${nummberOfImages * 300}px`;
  // }, [carouselDataFirst]);

  // useEffect(() => {
  //   const nummberOfImages = carouselDataSecond.length;
  //   if (secondCarousel === null) return;
  //   secondCarousel.style.width = `${nummberOfImages * 300}px`;
  // }, [carouselDataSecond]);

  useEffect(() => {
    if (isMouseDown) {
      carousel!.style.transition = "none";
      document.onmousemove = handleMove;
    } else {
      document.onmouseup = null;
      document.onmousemove = null;
      if (carousel === null) return;

      carousel!.style.transition = "transform 0.5s ease-in-out";
      const selectedImage = getNearestImage();

      const selectedImageArea = selectedImage!.getBoundingClientRect();
      const selectionContainer = snapRefObject.current;
      const selectedContainerArea = selectionContainer!.getBoundingClientRect();
      const diffX = selectedImageArea.left - selectedContainerArea.left;
      if (selectedImage) {
        setSelectedImageHTML(selectedImage.children[0] as HTMLImageElement);
      }

      setMouseX(mouseX - diffX);
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (!selectedImageHTML) return;
    const averageRatingString: string | number | undefined =
      selectedImageHTML.dataset.rating;
    let averageRating: number = 0;
    if (averageRatingString) averageRating = parseInt(averageRatingString, 10);

    const selectedBreed = selectedImageHTML.dataset.breed;
    const selectedSubBreed = selectedImageHTML.dataset.subbreed;
    const selectedUrl = selectedImageHTML.src;
    setSelectedImageData(
      selectedBreed,
      selectedSubBreed,
      averageRating,
      selectedUrl,
    );
  }, [selectedImageHTML]);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (isAnImageExpanded) return;
    setInitialMousePos(e.clientX);
    setIsMouseDown(true);
    document.onmouseup = mouseUpHelper;
  }

  function mouseUpHelper() {
    setIsMouseDown(false);
  }

  function handleMove(e: MouseEvent) {
    const diff = (initialMousePos - e.clientX) * -1;
    setMouseX(mouseX + diff);
  }

  function getNearestImage() {
    if (snapRefObject.current === null || carouselRefObject.current === null)
      return;
    const selectedImageArea = snapRefObject.current.getBoundingClientRect();
    const middleCoordX = (selectedImageArea.left + selectedImageArea.right) / 2;
    if (firstCarousel === null || secondCarousel === null)
      throw new Error("carousel is null");

    const carouselImages = [
      ...firstCarousel.children,
      ...secondCarousel.children,
    ];

    let selectedImage: HTMLImageElement | undefined;

    for (let image of carouselImages) {
      const imageArea = image.getBoundingClientRect();
      const imageMiddleCoordX = (imageArea.left + imageArea.right) / 2;
      if (selectedImage === undefined)
        selectedImage = image as HTMLImageElement;
      else {
        const imageDiff = Math.abs(imageMiddleCoordX - middleCoordX);
        const selectedImageArea = selectedImage.getBoundingClientRect();
        const selectedImageCoordX =
          (selectedImageArea.left + selectedImageArea.right) / 2;
        const selectedImageDiff = Math.abs(selectedImageCoordX - middleCoordX);
        if (imageDiff <= selectedImageDiff)
          selectedImage = image as HTMLImageElement;
      }
    }

    return selectedImage;
  }

  function handleExpand() {
    if (!selectedImageHTML) return;
    const carouselDataFirstClone = carouselDataFirst.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      if (element.url === selectedImageHTML.src) element.isExpanded = true;
      return element;
    });
    const carouselDataSecondClone = carouselDataSecond.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      if (element.url === selectedImageHTML.src) element.isExpanded = true;
      return element;
    });
    setCarouselDataFirst(carouselDataFirstClone);
    setCarouselDataSecond(carouselDataSecondClone);
    setIsAnImageExpanded(true);
  }

  function handleCollapse() {
    const carouselDataFirstClone = carouselDataFirst.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      return element;
    });
    const carouselDataSecondClone = carouselDataSecond.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      return element;
    });
    setCarouselDataFirst(carouselDataFirstClone);
    setCarouselDataSecond(carouselDataSecondClone);
    setIsAnImageExpanded(false);
  }

  async function handleFirstBoundary(index: number) {
    if (secondCarousel === null) return;

    if (index > 40 && arrayPosition[1] === "first") {
      //Moving second array to the right
      const distance = getCarouselDistance();
      setSecondShiftX(secondShiftX + distance);
      secondCarousel.style.justifyContent = "left";
      setArrayPosition(["first", "second"]);
      mutateArrayData("second", secondCarousel);
    }
    if (index < 10 && arrayPosition[0] === "first") {
      //moving second array to the left

      const distance = getCarouselDistance();
      setSecondShiftX(secondShiftX + distance * -1);
      secondCarousel.style.justifyContent = "right";
      setArrayPosition(["second", "first"]);
      mutateArrayData("second", secondCarousel);
    }
  }

  async function handleSecondBoundary(index: number) {
    if (firstCarousel === null) return;

    if (index > 40 && arrayPosition[1] === "second") {
      //moving first array to the right
      const distance = getCarouselDistance();
      setFirstShiftX(firstShiftX + distance);
      firstCarousel.style.justifyContent = "left";
      setArrayPosition(["second", "first"]);
      mutateArrayData("first", firstCarousel);
    }
    if (index < 10 && arrayPosition[0] === "second") {
      //moving first array to the left
      const distance = getCarouselDistance();
      setFirstShiftX(firstShiftX + distance * -1);
      firstCarousel.style.justifyContent = "right";
      setArrayPosition(["first", "second"]);
      mutateArrayData("first", firstCarousel);
    }
  }

  function getCarouselDistance() {
    if (firstCarousel === null || secondCarousel === null) return 0;
    const firstCarouselWidth = firstCarousel.getBoundingClientRect().width;

    const secondCarouselWidth = secondCarousel.getBoundingClientRect().width;
    const distance = firstCarouselWidth + secondCarouselWidth;
    return distance;
  }

  // function swapSecondLeft() {
  //   const distance = getCarouselDistance();
  //   console.log(distance);

  //   setSecondShiftX(secondShiftX + distance * -1);
  // }

  // function swapSecondRight() {
  //   const distance = getCarouselDistance();
  //   console.log(distance);

  //   setSecondShiftX(secondShiftX + distance);
  // }
  // function swapFirstLeft() {
  //   const distance = getCarouselDistance();
  //   console.log(distance);
  //   setFirstShiftX(firstShiftX + distance * -1);
  // }
  // function swapFirstRight() {
  //   const distance = getCarouselDistance();
  //   console.log(distance);
  //   setFirstShiftX(firstShiftX + distance);
  // }

  return (
    <div>
      {/* <button onClick={swapFirstLeft}>swapFirstLeft</button>
      <button onClick={swapFirstRight}>swapFirstRight</button>
      <button onClick={swapSecondLeft}>swapSecondLeft</button>
      <button onClick={swapSecondRight}>swapSecondRight</button> */}
      <div className="chosen-image" ref={snapRefObject}>
        <div
          className={classnames("expand-image", {
            expanded:
              (isAnImageExpanded && selectedImageHTML) ||
              (!isAnImageExpanded && !selectedImageHTML),
          })}
          onClick={handleExpand}
        />
      </div>
      <div
        key="carousel-container"
        className="carousel-container"
        style={{
          transform: `translate(${mouseX}px, 35%)`,
        }}
        ref={carouselRefObject}
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
                isAnImageExpanded={isAnImageExpanded}
                handleCollapse={handleCollapse}
                index={index}
                handleBoundary={handleFirstBoundary}
                parentContainer="first-carousel"
                key={key}
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
                isAnImageExpanded={isAnImageExpanded}
                handleCollapse={handleCollapse}
                index={index}
                handleBoundary={handleSecondBoundary}
                parentContainer="second-carousel"
                key={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
