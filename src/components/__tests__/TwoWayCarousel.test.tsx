import * as React from "react";
import { getByText, screen, waitFor } from "@testing-library/react";
import { setup } from "../../test-helpers/user-event-setup.js";
import TwoWayCarousel from "../carousel/Carousel.js";

jest.mock("../carousel-image-container/CarouselImageContainer", () => {
  return jest.fn().mockReturnValue(null);
});

const mutateArrayData = jest.fn();
const mockCarouselData = [
  {
    breed: "Dog Breed",
    subBreed: "Sub Breed",
    averageRating: 4.5,
    myRating: 3,
    numberOfRates: 10,
    url: "https://example.com/image.jpg",
    isExpanded: false,
  },
];

describe("Carousel", () => {
  it("should expand the image when clicked", async () => {
    const { user } = setup(
      <TwoWayCarousel
        carouselDataFirst={mockCarouselData}
        carouselDataSecond={mockCarouselData}
        selectedImageHTML={undefined}
        isAnImageExpanded={false}
        setSelectedImageHTML={jest.fn()}
        setIsAnImageExpanded={jest.fn()}
        mutateArrayData={mutateArrayData}
        maxSamples={10}
        skipCount={0}
        sampleSize={5}
      />,
    );

    const expandImage = screen.getByTestId("expand-image");
    await user.click(expandImage);

    expect(expandImage).toHaveClass("expanded");
  });
});
