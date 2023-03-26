export type BreedData = {
  url: [(string | null)[]];
  breed: string;
  subBreed: (string | null)[];
  rating: (number | null)[];
  numberOfRates: number[];
};

export type BreedDataDb = {
  breed: string;
  rating: number;
  url?: string[];
};

export type TableData = Omit<BreedData, "rating" | "url" | "numberOfRates"> & {
  rating: number | null;
  votes: number;
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
