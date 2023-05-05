import { useEffect, useState } from "react";
import { UrlRatingData } from "../../types";
import { postDogs, getDogByUrl } from "../../services/backend/dogs";
import { useNavigate, useLocation } from "react-router-dom";

const useUpdateRating = ({
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
}: {
  selectedUrl: string | null;
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  chosenRating: number | null;
  selectedCarousel: "first" | "second" | null;
  selectedCarouselIndex: number | null;
  homeData: UrlRatingData[];
  setSelectedMyRating: React.Dispatch<React.SetStateAction<number | null>>;
  setHomeData: React.Dispatch<React.SetStateAction<UrlRatingData[]>>;
  setSelectedAverageRating: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    handleRateClick();
  }, [isClicked]);

  useEffect(() => {
    setSelectedMyRating(chosenRating);
    const updatedItem = homeData.find((item) => item.url === selectedUrl);
    if (updatedItem && updatedItem.averageRating != null)
      setSelectedAverageRating(updatedItem.averageRating);
  }, [homeData]);

  async function handleRateClick() {
    if (
      chosenRating === null ||
      selectedUrl === null ||
      selectedBreed === null ||
      selectedCarousel === null ||
      selectedCarouselIndex === null
    )
      return;
    const response = await postDogs(
      selectedUrl,
      selectedBreed,
      selectedSubBreed,
      chosenRating,
    );
    if (response.status !== 200) {
      const myHeader = response.headers.values();
      const redirectValue = myHeader.next().value;
      return navigate(redirectValue, { state: { background: location } });
    }

    const updatedUrl = await getDogByUrl(selectedUrl);
    const homeDataClone = [...homeData];
    const newAverageRating = updatedUrl.averageRating;
    const newMyRating = updatedUrl.myRating;
    const newNumberOfRates = updatedUrl.numberOfRates;
    let targetImage;
    if (selectedCarousel === "first") {
      targetImage = homeDataClone[selectedCarouselIndex];
    } else if (selectedCarousel === "second") {
      targetImage = homeDataClone[selectedCarouselIndex + 50];
    }
    if (!targetImage) return;
    targetImage.averageRating = newAverageRating;
    targetImage.myRating = newMyRating;
    targetImage.numberOfRates = newNumberOfRates;
    setHomeData(homeDataClone);
  }
  return { isClicked, setIsClicked };
};

export default useUpdateRating;
