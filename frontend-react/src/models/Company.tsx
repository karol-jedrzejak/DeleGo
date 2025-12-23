import type { SearchType, SortType } from '@/api/queryParams/types'
import type { ValidationErrorsType } from '@/api/response/types'
// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
  "nip",
  "krs",
  "regon",
  "name_short",
  "name_complete",
  "street",
  "house_number",
  "city",
  "postal_code",
  "postal_city",
  "region",
  "country",
  "latitude",
  "longitude",
  "distance",
  "distance_time"
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends "nip" | "krs" | "regon" | "street" ? string | null :
    K extends "latitude" | "longitude" | "distance" | "distance_time" ? number | null :
    string; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  nip: null,
  krs: null,
  regon: null,
  name_short: "",
  name_complete: "",
  street: "",
  house_number: "",
  city: "",
  postal_code: "",
  postal_city: "",
  region: "Wielkopolskie",
  country: "Polska",
  latitude: null,
  longitude: null,
  distance: null,
  distance_time: null,
};

// -------------------------------------------------------------------------- //
// Domyślne SORTOWANIE I WYSZUKIWANIE
// -------------------------------------------------------------------------- //

export const DEFAULT_SORT:SortType = [{
  sortBy: 'name_short',
  sortDir: 'asc',
}];

export const DEFAULT_SEARCH:SearchType = {
  search: null,
  searchBy: null,
};

export const DEFAULT_PAGE:string = "1";

export const DEFAULT_PER_PAGE:number = 10;

// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemType = FormDataType &{
    id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    has_employees: boolean,
};

export type DataType = ItemType[];

// -------------------------------------------------------------------------- //
// GENEROWANE AUTOMATYCZNIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// -------------------------------------------------------------------------- //

// -------------------------------------------------------------------------- //
// Typy błędów formularza
// -------------------------------------------------------------------------- //

export type FormErrorType = {
  [K in keyof FormDataType]: string[] | null
}

// -------------------------------------------------------------------------- //
// Props dla komponentu formularza
// -------------------------------------------------------------------------- //

export type FormPropsType = {
  formData: FormDataType,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
  formError: ValidationErrorsType,
};

// -------------------------------------------------------------------------- //
// Puste, inicjalne błędy formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_ERRORS: FormErrorType =
  Object.fromEntries(formDataKeys.map((key) => [key, null])) as FormErrorType;
