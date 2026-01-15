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

export type ItemBasicType = {
  id: number,
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
  api: ItemBasicType
): FormDataType {
  return {
    id: api.id,
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
  starting_point: "",
  destination: "",
  description: "",
  distance: 1,
  departure: "",
  arrival: "",
};





