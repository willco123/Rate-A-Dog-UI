import { useEffect, useState } from "react";
import parseStringToNumber from "../utils/parseStringToNumber";

const useDetermineSelection = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
  const [selectedAverageRating, setSelectedAverageRating] = useState<
    number | null
  >(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [selectedMyRating, setSelectedMyRating] = useState<number | null>(null);
  const [selectedImageHTML, setSelectedImageHTML] = useState<
    HTMLImageElement | undefined
  >(undefined);
  const [selectedCarousel, setSelectedCarousel] = useState<
    "first" | "second" | null
  >(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!selectedImageHTML) return;
    const imageContainer = selectedImageHTML.parentElement;
    if (!imageContainer) return;
    const averageRating = parseStringToNumber(
      selectedImageHTML.dataset.averagerating,
    );
    const numberOfRates = parseStringToNumber(
      selectedImageHTML.dataset.numberofrates,
    );
    const myRating = parseStringToNumber(selectedImageHTML.dataset.myrating); //if undef returns 0
    const breed = selectedImageHTML.dataset.breed;
    const subBreed = selectedImageHTML.dataset.subbreed;
    const url = selectedImageHTML.src;
    if (!imageContainer.dataset.index)
      throw new Error("Container has no index?!?");
    const carouselIndex = parseInt(imageContainer.dataset.index);
    const carousel = imageContainer.dataset.carousel as
      | "first"
      | "second"
      | null;

    if (breed) setSelectedBreed(breed);
    subBreed ? setSelectedSubBreed(subBreed) : setSelectedSubBreed(null);
    setSelectedMyRating(myRating);
    setSelectedAverageRating(averageRating);
    if (url) setSelectedUrl(url);
    setSelectedCarousel(carousel);
    setSelectedCarouselIndex(carouselIndex);
  }, [selectedImageHTML]);

  return {
    selectedBreed,
    selectedSubBreed,
    selectedAverageRating,
    selectedMyRating,
    selectedUrl,
    selectedCarousel,
    selectedCarouselIndex,
    selectedImageHTML,
    setSelectedImageHTML,
    setSelectedMyRating,
    setSelectedAverageRating,
  };
};

export default useDetermineSelection;
