import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  getAllDbDogs,
  getTwentyLowerDbDogs,
  getTwentyUpperDbDogs,
} from "../../services/backend";
import { formatCarouselData } from "../../utils/format-data/carousel-data";
import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer";
import type { CarouselData, UrlRatingData } from "../../types.js";
import "./carousel.scss";

export default function Carousel() {
  const [upperBound, setUpperBound] = useState<boolean>(true);
  const [lowerBound, setLowerBound] = useState<boolean>(false);
  const [highestIndex, setHighestIndex] = useState<number>(0);
  const [lowestIndex, setLowestIndex] = useState<number>(0);
  const [urlRatingData, setUrlRatingData] = useState<UrlRatingData[] | []>([]);
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [isAnImageExpanded, setIsAnImageExpanded] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [initialMousePos, setInitialMousePos] = useState(0);
  const [selectedImageHTML, setSelectedImageHTML] = useState<
    HTMLImageElement | undefined
  >(undefined);

  const snapRefObject = useRef<HTMLDivElement>(null);
  const carouselRefObject = useRef<HTMLDivElement>(null);
  const carousel = carouselRefObject.current;

  //not sure why removeEventListener is not working using old method for now
  useEffect(() => {
    (async () => {
      const dbDogs = await getAllDbDogs();
      if (!dbDogs) return setUrlRatingData([]);
      return setUrlRatingData(dbDogs);
    })();
  }, []);

  useEffect(() => {
    console.log(urlRatingData.length);
    console.log(urlRatingData);
    if (urlRatingData.length === 0) return;
    const carouselData = formatCarouselData(urlRatingData);
    return setCarouselData(carouselData);
  }, [urlRatingData]);

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
    if (carousel === null) throw new Error("carousel is null");
    const carouselImages = carousel.children;

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

  function getDistanceBetweenTwentyImages() {
    if (carousel === null) return;
    const carouselImages = carousel.children;
    const firstImage = carouselImages[0];
    const twentiethImage = carouselImages[20];

    const firstImageCoordX = firstImage.getBoundingClientRect().left;
    const twentiethImageCoordX = twentiethImage.getBoundingClientRect().left;

    return twentiethImageCoordX - firstImageCoordX;
  }

  function handleExpand() {
    if (!selectedImageHTML) return;
    const carouselDataClone = carouselData.map((element) => {
      element.isExpanded = false;
      if (element.url === selectedImageHTML.src) element.isExpanded = true;
      return element;
    });
    setCarouselData(carouselDataClone);
    setIsAnImageExpanded(true);
  }

  function handleCollapse() {
    const carouselDataClone = carouselData.map((element) => {
      element.isExpanded = false;
      return element;
    });
    setCarouselData(carouselDataClone);
    setIsAnImageExpanded(false);
  }

  async function handleBoundaries(index: number) {
    if (index > highestIndex) setHighestIndex(index);
    if (index < lowestIndex) setLowestIndex(index);

    if (upperBound && highestIndex == 40) {
      setLowerBound(true); //enable lower bound

      const newUrlRatingData = await getTwentyUpperDbDogs(urlRatingData);
      const distance = getDistanceBetweenTwentyImages();
      if (!distance) return;
      setUrlRatingData(newUrlRatingData);
      carousel!.style.transition = "none";
      setMouseX(mouseX + distance);
      setHighestIndex(20);
      setLowestIndex(20);
    }

    if (lowerBound && lowestIndex == 10) {
      const newUrlRatingData = await getTwentyLowerDbDogs(urlRatingData);
      const distance = getDistanceBetweenTwentyImages();
      if (!distance) return;
      setUrlRatingData(newUrlRatingData);
      carousel!.style.transition = "none";
      setMouseX(mouseX - distance);
      setLowestIndex(30);
      setHighestIndex(30);
    }
  }

  return (
    <div>
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
        className={classnames("slider-image-container", {
          expanded: isAnImageExpanded,
        })}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${mouseX}px, -50%)`,
        }}
        ref={carouselRefObject}
        // ref={initCarousel}
      >
        {carouselData.map((element, index) => {
          return (
            <CarouselImageContaniner
              carouselData={element}
              isAnImageExpanded={isAnImageExpanded}
              handleCollapse={handleCollapse}
              index={index}
              handleBoundaries={handleBoundaries}
            />
          );
        })}
      </div>
    </div>
  );
}

//0123456789ABCDEF
//xxxxxxxxxxABCDEF0123456789
