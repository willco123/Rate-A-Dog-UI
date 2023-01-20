export type TableProps = {
  tableData: TableData[] | [];
  theadData: string[];
  setTableData: React.Dispatch<
    React.SetStateAction<
      {
        breed: string;
        subBreed: (string | null)[];
        rating: number[];
      }[]
    >
  >;

  initialState: TableData[] | [];
};

export type TableBodyData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number | null;
};

export type TableData = {
  breed: string;
  subBreed: (string | null)[];
  rating: number[];
};

export type TableRowProps = {
  data: TableBodyData;
  onDropDownChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    tableParentElement: string | undefined,
  ) => void;
  thead: string[];
  setBreedRating: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  breedRating: (number | null)[];
  tableParentElement: string | undefined;
};

export type PageData = {
  data: TableBodyData[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (i: number) => void;
};

export type Breed = string | null;
