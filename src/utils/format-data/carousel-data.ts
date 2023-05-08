import type { UrlRatingData, CarouselData } from "../../types.js";

export function formatCarouselData(urlRatingData: UrlRatingData[]) {
  const carouselData: CarouselData[] = urlRatingData.map((element) => {
    const { breed, subBreed, averageRating, url, numberOfRates } = element;
    let myRating = element.myRating;
    if (!myRating) myRating = null;
    return {
      breed,
      subBreed,
      averageRating,
      url,
      numberOfRates,
      myRating,
      isExpanded: false,
    };
  });
  return carouselData;
}
