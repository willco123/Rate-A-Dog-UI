export type TableData = {
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
