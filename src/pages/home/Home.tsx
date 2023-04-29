import React, { useState } from "react";
import "./home.scss";
import FiveStarRating from "../../components/five-star-rating/FiveStarRating.js";
import TwoWayCarousel from "../../components/two-way-carousel/TwoWayCarousel.js";
import useDetermineSelection from "../../custom-hooks/useDetermineSelection.js";
import useImageExpansion from "../../custom-hooks/useImageExpansion.js";
import useSetData from "../../custom-hooks/home/useSetData.js";
import useUpdateRating from "../../custom-hooks/home/useUpdateRating.js";

function Home() {
  const [sampleSize, setSampleSize] = useState<number>(100);

  const {
    homeData,
    chosenRating,
    carouselDataFirst,
    carouselDataSecond,
    setHomeData,
    mutateHomeData,
    setChosenRating,
    setCarouselDataFirst,
    setCarouselDataSecond,
  } = useSetData({ sampleSize });

  const {
    selectedBreed,
    selectedSubBreed,
    selectedAverageRating,
    selectedMyRating,
    selectedUrl,
    selectedCarousel,
    selectedCarouselIndex,
    selectedImageHTML,
    setSelectedMyRating,
    setSelectedImageHTML,
    setSelectedAverageRating,
  } = useDetermineSelection();

  const { isClicked, setIsClicked } = useUpdateRating({
    selectedUrl,
    selectedBreed,
    selectedSubBreed,
    chosenRating,
    selectedCarousel,
    selectedCarouselIndex,
    homeData,
    setSelectedMyRating,
    setHomeData,
    setSelectedAverageRating,
  });

  const { isAnImageExpanded, setIsAnImageExpanded } = useImageExpansion({
    selectedImageHTML,
    carouselDataFirst,
    carouselDataSecond,
    setCarouselDataFirst,
    setCarouselDataSecond,
  });

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedRating = e.target.value;
    const selectedRatingAsNumber = parseInt(selectedRating, 10);
    setChosenRating(selectedRatingAsNumber);
  }

  return (
    <div className="home-wrapper">
      <div className="image-data">
        <span>Breed: {selectedBreed}</span>
        <span>Sub-Breed : {selectedSubBreed}</span>

        <div>
          <span>AvgRating: {selectedAverageRating}</span>
          <span>MyRating: {selectedMyRating}</span>
        </div>
        <div className="chosen-image-home"></div>
        <FiveStarRating onChange={handleRatingChange} />
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="Dogs-button"
        >
          Rate the Dog!
        </button>
      </div>

      <TwoWayCarousel
        key={"home-data" + homeData.length}
        carouselDataFirst={carouselDataFirst}
        carouselDataSecond={carouselDataSecond}
        selectedImageHTML={selectedImageHTML}
        isAnImageExpanded={isAnImageExpanded}
        mutateHomeData={mutateHomeData}
        setSelectedImageHTML={setSelectedImageHTML}
        setIsAnImageExpanded={setIsAnImageExpanded}
      />
    </div>
  );
}

export default Home;
