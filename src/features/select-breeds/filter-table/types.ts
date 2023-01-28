export type Breeds = {
  [key: string]: (string | null)[];
};

export type TableProps = {
  tbodyData: Breeds;
  theadData: string[];
};

export type TableRowProps = {
  data: [string, (string | null)[]];
  thead: string[];
  isDropDownDisabled: boolean;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDropDownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type Breed = string | null;

export type BreedArray = [string, (string | null)[]];
