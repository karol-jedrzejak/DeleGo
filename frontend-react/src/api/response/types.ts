export type ItemLinkType = {
    url: string | null,
    label: string,
    Previous: string,
    page: string | null,
    active: Boolean,
};

export type PaginationData = {
    current_page:   number,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: ItemLinkType[],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number,   
};

export type PaginatedDataResponse<T> = PaginationData & {
  data: T;
};

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