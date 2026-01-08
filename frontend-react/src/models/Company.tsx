
// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
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
};

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

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
