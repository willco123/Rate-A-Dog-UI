export type BreedData = {
  breed: string;
  subBreed: (string | null)[];
  rating: (number | null)[];
};

export type TableData = Omit<BreedData, "rating"> & {
  rating: number | null;
};

export type TableDataJSX = {
  breed: JSX.Element;
  subBreed: JSX.Element;
  rating: JSX.Element;
};

export type Breeds = {
  [key: string]: (string | null)[];
};
