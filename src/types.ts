export type BreedData = {
  breed: string;
  subBreed: string | null;
  url: (string | null)[];
  rating: number | null;
  numberOfRates: number;
};

export type TableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
  votes: number;
};

export type BreedDataGrouped = {
  breed: string;
  subBreed: (string | null)[];
  rating: (number | null)[];
  votes: number[];
};

export type TableDataJSX = {
  breed: JSX.Element;
  subBreed: JSX.Element;
  rating: JSX.Element;
  votes: JSX.Element;
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

export type UserRatingData = {
  breed: string;
  subBreed: string | null;
  urlRatings: UrlRatings[];
};

export type UserRatingDataGrouped = {
  breed: string;
  subBreed: (string | null)[];
  urls: string[][];
  urlRatings: (number | null)[][];
};

export type UserRatingTableData = {
  breed: string;
  subBreed: (string | null)[];
  urls: string[];
  urlRating: number | null;
};

export type UserRatingTableDataJSX = {
  breed: JSX.Element;
  subBreed: JSX.Element;
  urls: JSX.Element;
  urlRating: JSX.Element;
};

type UrlRatings = [number | null, string];

export type UrlRatingData = {
  breed: string;
  subBreed: string | null;
  url: string;
  numberOfRates: number;
  myRating: number | null;
  // userRatingData: UrlUserRatingData[];
  averageRating: number | null;
};

type UrlUserRatingData = {
  url: string;
  rating: number | null;
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

type AllUrlRatings = {
  avgRating: number | null;
  url: string;
  numberOfRates: number;
};

export type FilterData = { breed: string; subBreed: string | null };
