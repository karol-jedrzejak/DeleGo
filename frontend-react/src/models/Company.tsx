
// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

/* export const formDataKeys = [
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
 */

export type FormDataType = {
  nip: string | null,
  krs: string | null,
  regon: string | null,
  name_short: string,
  name_complete: string,
  street: string | null,
  house_number: string,
  city: string,
  postal_code: string,
  postal_city: string,
  region: string,
  country: string,
  latitude: number | null,
  longitude: number | null,
  distance: number | null,
  distance_time: number | null,
}

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
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  nip: string | null,
  krs: string | null,
  regon: string | null,
  name_short: string,
  name_complete: string,
  street: string | null,
  house_number: string,
  city: string,
  postal_code: string,
  postal_city: string,
  region: string,
  country: string,
  latitude: number | null,
  longitude: number | null,
  distance: number | null,
  distance_time: number | null,
  id: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
};

// -------------------------------------------------------------------------- //
// GENEROWANE AUTOMATYCZNIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// -------------------------------------------------------------------------- //

// -------------------------------------------------------------------------- //
// Typy błędów formularza
// -------------------------------------------------------------------------- //

/* type FormErrorType = {
  [K in keyof FormDataType]: string[] | null
}
 */
type FormErrorsType = {
  [K in keyof FormDataType]?: string[] | null
}

// -------------------------------------------------------------------------- //
// Puste, inicjalne błędy formularza
// -------------------------------------------------------------------------- //

/* export const DEFAULT_FORM_ERRORS: FormErrorType =
  Object.fromEntries(formDataKeys.map((key) => [key, null])) as FormErrorType;
 */

export const DEFAULT_FORM_ERRORS: FormErrorsType = Object.fromEntries(
  Object.keys(DEFAULT_FORM_DATA).map((key) => [key, undefined])
) as FormErrorsType