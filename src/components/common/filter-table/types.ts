export type TableProps = {
  tbodyData: TableDataJSON;
  theadData: string[];
};

export type TableDataJSON = {
  [key: string]: (string | never)[];
};

export type TableRowProps = {
  data: [string, string[] | null[]];
  thead: string[];
  isDropDownDisabled: boolean;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDropDownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type Breed = string | null;
