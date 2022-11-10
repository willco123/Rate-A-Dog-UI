export type TableProps = {
  tbodyData: TableBodyData[];
  theadData: string[];
};

export type TableBodyData = {
  breed: string;
  subBreed: string | null;
  rating: number;
};

export type TableRowProps = {
  data: TableBodyData;
};
