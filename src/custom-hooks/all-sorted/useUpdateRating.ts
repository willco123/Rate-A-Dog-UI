import { useEffect, useState } from "react";
import { SortTypes, UrlRatingData } from "../../types";
import { postDogs, getAllSorted } from "../../services/backend/dogs";
import { useNavigate, useLocation } from "react-router-dom";

const useUpdateRating = ({
  selectedUrl,
  selectedBreed,
  selectedSubBreed,
  chosenRating,
  sortedData,
  sortOrder,
  sortMode,
  skipCount,
  sampleSize,
  filteredBreed,
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
    const updatedData: UrlRatingData[] = await getAllSorted(
      sortOrder,
      sortMode,
      skipCount - 100,
      sampleSize,
      filteredBreed,
    );
    setSortedData(updatedData);
  }
  return { isClicked, setIsClicked };
};

export default useUpdateRating;
