import * as React from "react";
import { getByText, screen, waitFor } from "@testing-library/react";
import CarouselImageContainer from "../carousel-image-container/CarouselImageContainer";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { setup } from "../../test-helpers/user-event-setup.js";

// beforeEach(() => {
//   setupIntersectionObserverMock();
// });

describe("CarouselImageContainer", () => {
  const mockCarouselData = {
    breed: "Dog Breed",
    subBreed: "Sub Breed",
    averageRating: 4.5,
    myRating: 3,
    numberOfRates: 10,
    url: "https://example.com/image.jpg",
    isExpanded: false,
  };

  test("renders correctly", async () => {
    const index = 0;
    const parentContainer = "first";
    const isAnImageExpanded = false;
    const setIsImageExpanded = jest.fn();
    const setIndex = jest.fn();

    const { user } = setup(
      <CarouselImageContainer
        carouselData={mockCarouselData}
        index={index}
        parentContainer={parentContainer}
        isAnImageExpanded={isAnImageExpanded}
        setIsImageExpanded={setIsImageExpanded}
        setIndex={setIndex}
      />,
    );

    const imageContainer = screen.getByTestId("image-container");
    expect(imageContainer).toBeInTheDocument();

    mockAllIsIntersecting(1);

    const imageElement = await screen.findByAltText("Dog Breed");
    expect(imageElement).toBeInTheDocument();
  });
});
