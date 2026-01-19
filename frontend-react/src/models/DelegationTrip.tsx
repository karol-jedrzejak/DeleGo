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


// -------------------------------------------------------------------------- //
// Typy błedów formularza
// -------------------------------------------------------------------------- //

export type ErrorDataType = {
  starting_point: string[] | null,
  destination: string[] | null,
  description: string[] | null,
  distance: string[] | null,
  departure: string[] | null,
  arrival: string[] | null,
}

export const DEFAULT_ERROR_DATA = {
  starting_point: null,
  destination: null,
  description: null,
  distance: null,
  departure: null,
  arrival: null,
};

// -------------------------------------------------------------------------- //
// form functions
// -------------------------------------------------------------------------- //


export const hasTripOverlap = (
    toCheckTrip:FormDataType,
    trips: FormDataType[]
    ) => {
    const newStart = new Date(toCheckTrip.departure).getTime();
    const newEnd = new Date(toCheckTrip.arrival).getTime();

    return trips.some(trip => {
        const start = new Date(trip.departure).getTime();
        const end = new Date(trip.arrival).getTime();

        return newStart < end && newEnd > start;
    });
};

export  const hasDateBetween = (toCheckDate: string, delStart: string, delEnd: string) => {
    const date = new Date(toCheckDate).getTime();
    const start = new Date(delStart).getTime();
    const end = new Date(delEnd).getTime();
    return date <= end && date >= start;
};




