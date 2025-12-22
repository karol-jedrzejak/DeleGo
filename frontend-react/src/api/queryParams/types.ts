export type SearchByItem = {
  name: string;
  value: string;
};

export type SearchType = {
  search: string | null;
  searchBy: SearchByItem[] | null;
};

export type SortItem = {
  sortBy: string;
  sortDir: string;
};

export type SortType = SortItem[];

export type PaginationParams = {
  page: string;
  perPage: number;
  search: SearchType;
  sort: SortType;
};