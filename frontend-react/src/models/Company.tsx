
// -------------------------------------------------------------------------- //
// Subtypy danych
// -------------------------------------------------------------------------- //

export type CompanyIdentifiers = {
  nip: string | null;
  krs: string | null;
  regon: string | null;
};

export type CompanyNames = {
  name_short: string;
  name_complete: string;
};

export type CompanyAddress = {
  street: string | null;
  house_number: string;
  city: string;
  postal_code: string;
  postal_city: string;
  region: string;
  country: string;
};

export type CompanyGeo = {
  latitude: number | null;
  longitude: number | null;
};

export type CompanyDistance = {
  distance: number | null;
  distance_time: number | null;
};

export type MetaFull = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MetaDeletedOnly = {
  deleted_at: string | null;
};

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number;
  meta: MetaFull;
  identifiers: CompanyIdentifiers;
  names: CompanyNames;
  address: CompanyAddress;
  geo: CompanyGeo;
  distance: CompanyDistance;
};

export type ItemWithAddressType = {
  id: number;
  meta: MetaDeletedOnly;
  names: CompanyNames;
  address: CompanyAddress;
};

export type ItemNamesOnlyType = {
  id: number;
  name: string;
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    nip: api.identifiers.nip,
    krs: api.identifiers.krs,
    regon: api.identifiers.regon,
    name_short: api.names.name_short,
    name_complete: api.names.name_complete,
    street: api.address.street,
    house_number: api.address.house_number,
    city: api.address.city,
    postal_code: api.address.postal_code,
    postal_city: api.address.postal_city,
    region: api.address.region,
    country: api.address.country,
    latitude: api.geo.latitude,
    longitude: api.geo.longitude,
    distance: api.distance.distance,
    distance_time: api.distance.distance_time,
  };
}


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
  region: "",
  country: "Polska",
  latitude: null,
  longitude: null,
  distance: null,
  distance_time: null,
};
