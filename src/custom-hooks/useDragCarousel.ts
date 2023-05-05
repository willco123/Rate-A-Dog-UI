import React, { useEffect, useState } from "react";

const useDragCarousel = ({
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
  const [mouseX, setMouseX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState(0);
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
      document.onmousemove = handleMove;
    } else {
      document.onmouseup = null;
      document.onmousemove = null;
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
  return { mouseX, handleMouseDown };
};

export default useDragCarousel;
