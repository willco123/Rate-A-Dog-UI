export type PagedTableProps = {
  tbodyData: PagedTableData[] | [];
  theadData: string[];
  handleDropDownChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
    index: number,
  ) => void;
};

export type PagedTableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
};

export type BreedData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number[];
};

export type PagedTableRowProps = {
  data: PagedTableData;
  handleDropDownChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
    index: number,
  ) => void;
  thead: string[];

  tableParentElement: string | undefined;
};

export type PageData = {
  data: PagedTableData[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (i: number) => void;
};

export type Breed = string | null;

// setTableData: React.Dispatch<
// React.SetStateAction<
//   {
//     breed: string;
//     subBreed: (string | null)[];
//     rating: number[];
//   }[]
// >
// >;

// initialState: TableData[] | [];

// setBreedRating: React.Dispatch<React.SetStateAction<(number | null)[]>>;
// breedRating: (number | null)[];
