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

  // Search globalny
  if (search.search) {
    params.set("search", search.search);
  }

  // searchBy (grupy)
  search.searchBy?.forEach((item, index) => {
    // value
    params.set(`searchBy[${index}][value]`, item.value);

    // fields[]
    item.fields.forEach((field) => {
      params.append(`searchBy[${index}][fields][]`, field);
    });
  });

  // Sortowanie
  sort.forEach((item) => {
    params.append("sortBy[]", item.sortBy);
    params.append("sortDir[]", item.sortDir);
  });

  return params;
};
