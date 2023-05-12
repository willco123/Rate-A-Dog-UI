import React, { useEffect, useState } from "react";

const useDragCarouselTouch = ({
  parentCarousel,
  firstCarousel,
  secondCarousel,
  snapArea,
  isAnImageExpanded,
  setSelectedImageHTML,
}: // isMouseDown,
// initialMousePos,
{
  parentCarousel: HTMLDivElement | null;
  firstCarousel: HTMLDivElement | null;
  secondCarousel: HTMLDivElement | null;
  snapArea: HTMLDivElement | null;
  isAnImageExpanded: boolean;
  setSelectedImageHTML: React.Dispatch<
    React.SetStateAction<HTMLImageElement | undefined>
  >;
  // isMouseDown: boolean;
  // initialMousePos: number;
}) => {
  const [touchX, setTouchX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState(0);
  const ScrollSpeed = 1.5;
  useEffect(() => {
    if (
      snapArea === null ||
      parentCarousel === null ||
      firstCarousel === null ||
      secondCarousel === null
    )
      return;
    if (isMouseDown) {
      parentCarousel.style.transition = "none";
      document.ontouchmove = handleTouchMove;
    } else {
      document.ontouchend = null;
      document.ontouchmove = null;
      if (parentCarousel === null) return;

      parentCarousel.style.transition = "transform 0.5s ease-in-out";
      const selectedImage = getNearestImage();
      if (selectedImage) {
        setSelectedImageHTML(selectedImage.children[0] as HTMLImageElement);
      }

      const selectedImageArea = selectedImage!.getBoundingClientRect();
      const selectionContainer = snapArea;
      const selectedContainerArea = selectionContainer!.getBoundingClientRect();
      const diffX = selectedImageArea.left - selectedContainerArea.left;

      setTouchX(touchX - diffX);
    }
  }, [isMouseDown]);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (isAnImageExpanded) return;
    setInitialMousePos(e.touches[0].clientX);
    setIsMouseDown(true);
    document.ontouchend = touchEndHelper;
  }
  function touchEndHelper() {
    setIsMouseDown(false);
  }

  function handleTouchMove(e: TouchEvent) {
    const diff = (initialMousePos - e.touches[0].clientX) * -ScrollSpeed;
    setTouchX(touchX + diff);
  }

  function getNearestImage() {
    if (snapArea === null) return;
    const selectedImageArea = snapArea.getBoundingClientRect();
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
  return { touchX, handleTouchStart };
};

export default useDragCarouselTouch;
