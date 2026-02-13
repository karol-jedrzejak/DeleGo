export type ItemLinkType = {
    url: string | null,
    label: string,
    Previous: string,
    page: string | null,
    active: Boolean,
};

export type PaginationData = {
    current_page:   number,
    from: number,
    last_page: number,
    links: ItemLinkType[],
    path: string,
    per_page: number,
    to: number,
    total: number,   
};

    //first_page_url: string,
    //last_page_url: string,
    //next_page_url: string,
    //prev_page_url: string,

/* export type PaginatedDataResponse<T> = {
  data: T;
  meta: PaginationData;
}; */

export type PaginatedDataResponse<
  T,
  Extra extends object = {}
> = {
  data: T;
  meta: PaginationData;
} & Extra;


/* export type BackendTsResponseType = {
    text: string;
    type: "message" | "page";
    status: "success" | "error" | "info" | "warning";
}
 */
/* export type ValidationErrorsType<TFields extends string = string> = {
  [K in TFields]?: string[];
} | null;
 */