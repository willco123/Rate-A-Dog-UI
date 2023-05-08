import { useEffect, useState } from "react";
import { SortTypes, UrlRatingData } from "../../types.js";
import { postDogs, getUserDbDogs } from "../../services/backend/dogs.js";
import { useNavigate, useLocation } from "react-router-dom";

const useUpdateRating = ({
  selectedUrl,
  selectedBreed,
  selectedSubBreed,
  chosenRating,
  userData,
  sortOrder,
  sortMode,
  skipCount,
  sampleSize,
  filteredBreed,
  setUserData,
  setSelectedMyRating,
  setSelectedAverageRating,
}: {
  selectedUrl: string | null;
  selectedBreed: string | null;
  selectedSubBreed: string | null;
  chosenRating: number | null;
  userData: UrlRatingData[];
  selectedMyRating: number | null;
  sortOrder: "asc" | "desc";
  sortMode: SortTypes;
  skipCount: number;
  sampleSize: number;
  filteredBreed: { breed: string; subBreed: string | null } | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UrlRatingData[]>>;
  setSelectedMyRating: React.Dispatch<React.SetStateAction<number | null>>;
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
    const updatedItem = userData.find((item) => item.url === selectedUrl);
    if (updatedItem && updatedItem.averageRating != null)
      setSelectedAverageRating(updatedItem.averageRating);
  }, [userData]);

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
    const updatedData: UrlRatingData[] = await getUserDbDogs(
      sortOrder,
      sortMode,
      skipCount - 50,
      sampleSize,
      filteredBreed,
    );
    setUserData(updatedData);
  }
  return { isClicked, setIsClicked };
};

export default useUpdateRating;
