import type { UrlRatingData, CarouselData } from "../../types.js";

export function formatCarouselData(urlRatingData: UrlRatingData[]) {
  const carouselData: CarouselData[] = urlRatingData.map((element) => {
    if (element === null) return null;
    const { breed, subBreed, averageRating, url, numberOfRates } = element;

    return {
      breed,
      subBreed,
      averageRating,
      url,
      numberOfRates,
      isExpanded: false,
    };
  });
  return carouselData;
}

// export function formatCarouselDataUpper(
//   urlRatingData: UrlRatingData[],
//   newUrlRatingData: UrlRatingData[],
// ) {
//   const carouselData: CarouselData[] = urlRatingData.map((element) => {
//     const { breed, subBreed, averageRating, url, numberOfRates } = element;

//     return {
//       breed,
//       subBreed,
//       averageRating,
//       url,
//       numberOfRates,
//       isExpanded: false,
//     };
//   });
//   return carouselData;
// }
