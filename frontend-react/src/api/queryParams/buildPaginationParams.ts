import type { PaginationParams } from "@/api/queryParams/types";

export const buildPaginationParams = ({
  page,
  perPage,
  search,
  sort,
}: PaginationParams): URLSearchParams => {
  const params = new URLSearchParams();

  params.set("page", page);

  if (perPage) {
    params.set("perPage", perPage.toString());
  }

  if (search.search) {
    params.set("search", search.search);
  }

  search.searchBy?.forEach((item) => {
    params.append(`searchBy[${item.name}]`, item.value);
  });

  sort.forEach((item) => {
    params.append("sortBy[]", item.sortBy);
    params.append("sortDir[]", item.sortDir);
  });

  return params;
};
