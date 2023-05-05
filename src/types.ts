export type TableData = {
  breed: string;
  subBreed: string | null;
  averageRating: number | null;
  numberOfRates: number;
};

export type HandleDropDownChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  tableRowId: string,
  breedDataRowIndex: number,
) => void;

export type TableDataGrouped = {
  breed: string;
  subBreed: (string | null)[];
  averageRating: (number | null)[];
  numberOfRates: number[];
};

export type TableDataJSX = {
  breed: JSX.Element;
  subBreed: JSX.Element;
  averageRating: JSX.Element;
  numberOfRates: JSX.Element;
};

export type Breeds = {
  [key: string]: (string | null)[];
};

export type ActiveSubBreeds = {
  breed: string;
  activeSubBreed: string | null;
};

export type ActiveSubBreedUrls = {
  breed: string;
  activeSubBreed: string | null;
  url: string;
};

export type UrlRatingData = {
  breed: string;
  subBreed: string | null;
  url: string;
  numberOfRates: number;
  averageRating: number | null;
  myRating?: number | null;
};

export type SingleUrlOnRate = {
  numberOfRates: number;
  averageRating: number;
  myRating: number;
};

export type CarouselData = {
  breed: string;
  subBreed: string | null;
  url: string;
  numberOfRates: number;
  averageRating: number | null;
  myRating: number | null;
  isExpanded: boolean;
};

export type FilterData = { breed: string; subBreed: string | null };

export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  email: string;
};

export type SetSelectedImageData = (
  selectedBreed: string | undefined,
  selectedSubBreed: string | null | undefined,
  averageRating: number | null | undefined,
  url: string | undefined,
  myRating: number | null | undefined,
  selectedCarousel: "first" | "second" | null,
  selectedCarouselIndex: number | null,
) => void;

export type ImageExpansion =
  | ((
      selectedImageHTML: HTMLImageElement | undefined,
      carouselDataFirst: CarouselData[],
      carouselDataSecond: CarouselData[],
      setCarouselDataFirst: React.Dispatch<
        React.SetStateAction<CarouselData[]>
      >,
      setCarouselDataSecond: React.Dispatch<
        React.SetStateAction<CarouselData[]>
      >,
      setIsAnImageExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    ) => void)
  | undefined;

export type MutateArrayData = (
  targetArray: "first" | "second",
  direction: "left" | "right",
) => Promise<number>;

export type MutateHomeData = (
  targetArray: "first" | "second",
  carousel: HTMLDivElement,
) => void;

export type SortTypes = "averageRating" | "breed" | "numberOfRates";

// export interface ImageExpansion extends React.MouseEventHandler {
//   selectedImageHTML: HTMLImageElement | null;
//   carouselDataFirst: CarouselData[];
//   carouselDataSecond: CarouselData[];
//   setCarouselDataFirst: React.Dispatch<React.SetStateAction<CarouselData[]>>;
//   setCarouselDataSecond: React.Dispatch<React.SetStateAction<CarouselData[]>>;
//   setIsAnImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
// }
