import React, { useEffect, useState, useRef } from "react";
import {
  getAllDbDogs,
  getLowerDbDogs,
  getUpperDbDogs,
} from "../../services/backend";
import { formatCarouselData } from "../../utils/format-data/carousel-data";
import classnames from "classnames";
import CarouselImageContaniner from "../carousel-image-container/CarouselImageContainer";
import type { CarouselData, UrlRatingData } from "../../types.js";
import "./carousel.scss";

export default function Carousel() {
  const [upperBound, setUpperBound] = useState<number>(90);
  const [lowerBound, setLowerBound] = useState<number | null>(null);
  const [highestIndex, setHighestIndex] = useState<number>(0);
  const [lowestIndex, setLowestIndex] = useState<number>(0);
  const [isLowerBoundReached, setIsLowerBoundReached] =
    useState<boolean>(false);
  const [isHigherBoundReached, setIsHigherBoundReached] =
    useState<boolean>(false);
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
    console.log(urlRatingData);
    if (urlRatingData.length === 0) return;
    setIsHigherBoundReached(false);
    setIsLowerBoundReached(false);
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

  function getDistanceBetweenImages(numberOfImages: number) {
    if (carousel === null) return;
    const carouselImages = carousel.children;
    const firstImage = carouselImages[0];
    const xthImage = carouselImages[numberOfImages];

    const firstImageCoordX = firstImage.getBoundingClientRect().left;
    const xthImageCoordX = xthImage.getBoundingClientRect().left;

    return xthImageCoordX - firstImageCoordX;
  }

  function handleExpand() {
    if (!selectedImageHTML) return;
    const carouselDataClone = carouselData.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      if (element.url === selectedImageHTML.src) element.isExpanded = true;
      return element;
    });
    setCarouselData(carouselDataClone);
    setIsAnImageExpanded(true);
  }

  function handleCollapse() {
    const carouselDataClone = carouselData.map((element) => {
      if (element === null) return null;
      element.isExpanded = false;
      return element;
    });
    setCarouselData(carouselDataClone);
    setIsAnImageExpanded(false);
  }

  async function handleBoundaries(index: number) {
    if (index > highestIndex) setHighestIndex(index);
    if (index < lowestIndex) setLowestIndex(index);

    if (highestIndex >= upperBound) {
      setIsHigherBoundReached(true);
    }

    if (lowerBound === null) return;
    if (lowestIndex <= lowerBound) {
      setIsLowerBoundReached(true);
    }
  }

  useEffect(() => {
    if (isHigherBoundReached) {
      (async () => {
        setUpperBound(upperBound + 40);
        const newUrlRatingData = await getUpperDbDogs(urlRatingData);
        setUrlRatingData(newUrlRatingData);
        if (lowerBound != null) {
          setLowestIndex(lowerBound + 90);
          setLowerBound(lowerBound + 40);
        }

        if (lowerBound === null) {
          //init lower bound
          setLowestIndex(90);
          setLowerBound(50);
        }
      })();
    }
  }, [isHigherBoundReached]);

  useEffect(() => {
    if (isLowerBoundReached) {
      (async () => {
        if (lowerBound === 10) {
          console.log("here");
          console.log(lowestIndex);
          setLowestIndex(50);

          const newUrlRatingData = await getLowerDbDogs(urlRatingData);
          setUrlRatingData(newUrlRatingData);
        } else {
          setLowerBound(lowerBound! - 40);
          const newUrlRatingData = await getLowerDbDogs(urlRatingData);
          setUrlRatingData(newUrlRatingData);
          setHighestIndex(upperBound - 80);
          setUpperBound(upperBound - 40);
        }
      })();
    }
  }, [isLowerBoundReached]);

  useEffect(() => {
    console.log("lowestIndex", lowestIndex);
    console.log("lowerBound", lowerBound);
  }, [lowerBound]);

  useEffect(() => {
    console.log("highestIndex", highestIndex);
    console.log("upperBound", upperBound);
  }, [upperBound]);

  useEffect(() => {
    console.log("lowestIndex", lowestIndex);
  }, [lowestIndex]);

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

// useEffect(() => {
//   if(highestIndex === )
//   (async () => {
//     if (lowerBound != null) {
//       setLowestIndex(lowestIndex + 40);
//       setLowerBound(lowerBound + 40);
//     }
//     if (lowerBound === null) {
//       //init lower bound
//       setLowestIndex(90);
//       setLowerBound(50);
//     }

//     const newUrlRatingData = await getUpperDbDogs(urlRatingData);
//     setUrlRatingData(newUrlRatingData);
//   })();
// }, [upperBound]);

// useEffect(() => {
//   (async () => {
//     const newUrlRatingData = await getLowerDbDogs(urlRatingData);

//     setHighestIndex(highestIndex - 40);
//     setUpperBound(upperBound - 40);
//     setUrlRatingData(newUrlRatingData);
//   })();
// }, [lowerBound]);
