import React from "react";
import classnames from "classnames";
import type { UrlRatingData, CarouselData } from "../../types.js";

export function formatCarouselData(urlRatingData: UrlRatingData[]) {
  const carouselData: CarouselData[] = urlRatingData.flatMap((element) => {
    const { breed, subBreed, urlRatings } = element;
    const urlRatingsData = urlRatings.flat(1);

    const output = urlRatingsData.map((element) => {
      const { avgRating, numberOfRates, url } = element;
      return {
        breed,
        subBreed,
        rating: avgRating,
        numberOfRates,
        url,
        isExpanded: false,
      };
    });
    return output;
  });
  return carouselData;
}

export function formatCarouselDataJSX(
  carouselData: CarouselData[],
  isAnImageExpanded: boolean,
  handleCollapse: ((e: React.MouseEvent<HTMLDivElement>) => void) | undefined,
) {
  if (!isAnImageExpanded) handleCollapse = undefined;

  const imgJSXArray: JSX.Element[] = [];

  carouselData.forEach((element) => {
    const { breed, subBreed, rating, numberOfRates, url, isExpanded } = element;
    let isAnImageExpandedCopy = isAnImageExpanded;
    if (isExpanded) isAnImageExpandedCopy = false;

    const imgJSX = (
      <div className={classnames("slider-image")} key={url}>
        <img
          className={classnames({
            expanded: isExpanded,
            "another-image-expanded": isAnImageExpandedCopy,
          })}
          src={url}
          alt={breed}
          draggable={false}
          data-breed={breed}
          data-subbreed={subBreed}
          data-rating={rating}
          data-votes={numberOfRates}
          onClick={handleCollapse}
        />
      </div>
    );
    imgJSXArray.push(imgJSX);
  });
  return imgJSXArray;
}

{
  /* <div
onClick={handleExpand}
className={classnames("expand-image", {
  expanded: isExpanded,
})}
data-url={url}
/> */
}
