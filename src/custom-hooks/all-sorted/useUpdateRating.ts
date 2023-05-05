import { useEffect, useState } from "react";
import { SortTypes, UrlRatingData } from "../../types";
import { postDogs, getDogByUrl } from "../../services/backend/dogs";
import { useNavigate, useLocation } from "react-router-dom";

const useUpdateRating = ({
  selectedUrl,
  selectedBreed,
  selectedSubBreed,
  chosenRating,
  sortedData,
  setSortedData,
  setSelectedMyRating,
  setSelectedAverageRating,
}: {
  selectedUrl: string | null;
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  chosenRating: number | null;
  sortedData: UrlRatingData[];
  selectedMyRating: number | null;
  sortOrder: "asc" | "desc";
  sortMode: SortTypes;
  skipCount: number;
  sampleSize: number;
  filteredBreed: { breed: string; subBreed: string | null } | undefined;
  setSortedData: React.Dispatch<React.SetStateAction<UrlRatingData[]>>;
  setSelectedMyRating: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedAverageRating: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    handleRateClick();
  }, [isClicked]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    //update selected rating straight away, not sure why react doesn't re-render this
    setSelectedMyRating(chosenRating);
    const updatedItem = sortedData.find((item) => item.url === selectedUrl);
    if (updatedItem && updatedItem.averageRating != null)
      setSelectedAverageRating(updatedItem.averageRating);
  }, [sortedData]);

  async function handleRateClick() {
    if (!chosenRating || !selectedUrl || !selectedBreed) return;
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
    const sortedDataClone = [...sortedData];
    const newAverageRating = updatedUrl.averageRating;
    const newMyRating = updatedUrl.myRating;
    const newNumberOfRates = updatedUrl.numberOfRates;
    const targetImage = sortedDataClone.find(
      (item) => item.url === selectedUrl,
    );
    if (!targetImage) return;
    targetImage.averageRating = newAverageRating;
    targetImage.myRating = newMyRating;
    targetImage.numberOfRates = newNumberOfRates;
    setSortedData(sortedDataClone);
  }
  return { isClicked, setIsClicked };
};

export default useUpdateRating;
