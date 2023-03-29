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
