// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number,
  delegation_id: number,
  starting_point: string,
  destination: string,
  description: string,
  distance: number,
  departure: string,
  arrival: string,
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    id: api.id,
    delegation_id: api.delegation_id,
    starting_point: api.starting_point,
    destination: api.destination,
    description: api.description,
    distance: api.distance,
    departure: api.departure,
    arrival: api.arrival,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  id: number | null,
  delegation_id: number | null,
  starting_point: string,
  destination: string,
  description: string,
  distance: number,
  departure: string,
  arrival: string,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  id: null,
  delegation_id: null,
  starting_point: "",
  destination: "",
  description: "",
  distance: 1,
  departure: "",
  arrival: "",
};





