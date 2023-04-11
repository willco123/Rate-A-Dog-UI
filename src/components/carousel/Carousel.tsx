import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAllDbDogs } from "../../services/backend";
import {
  formatCarouselData,
  formatCarouselDataJSX,
} from "../../utils/format-data/carousel-data";
import classnames from "classnames";
import type { CarouselData, UrlRatingData } from "../../types.js";
import "./carousel.scss";

export default function Carousel() {
  const [urlRatingData, setUrlRatingData] = useState<UrlRatingData[] | []>([]);
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [carouselDataJSX, setCarouselDataJSX] = useState<JSX.Element[]>([]);
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
      setUrlRatingData(dbDogs);
    })();
  }, []);

  useEffect(() => {
    const carouselData = formatCarouselData(urlRatingData);
    setCarouselData(carouselData);
  }, [urlRatingData]);

  useEffect(() => {
    const carouselDataJSX = formatCarouselDataJSX(
      carouselData,
      isAnImageExpanded,
      handleCollapse,
    );
    setCarouselDataJSX(carouselDataJSX);
  }, [carouselData]);

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

  return (
    <div>
      <span>{selectedImageHTML?.dataset.rating}</span>

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
        {carouselDataJSX}
      </div>
    </div>
  );
}

// const initCarousel = useCallback((instance: HTMLDivElement) => {
//   const carousel = instance;
//   if (carousel === null) return;
//   if (carousel.children.length === 0) return;
//   carousel!.style.transition = "transform 0.5s ease-in-out";
//   const selectedImage = getNearestImage();
//   const selectedImageArea = selectedImage!.getBoundingClientRect();
//   const selectionContainer = snapRefObject.current;
//   const selectedContainerArea = selectionContainer!.getBoundingClientRect();
//   const diffX = selectedImageArea.left - selectedContainerArea.left;
//   if (selectedImage) {
//     setSelectedImageHTML(selectedImage.children[0] as HTMLImageElement);
//   }

//   setMouseX(mouseX - diffX);
// }, []);
