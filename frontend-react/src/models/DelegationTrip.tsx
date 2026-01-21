import type { ItemBasicType as CarBasicType } from '@/models/Car';
import type { ItemBasicType as DelegationTripTypeType } from '@/models/DelegationTripType';

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
  car: CarBasicType | null;
  custom_transport: string | null,
  delegation_trip_type: DelegationTripTypeType,
};

export type ItemBasicType = {
  id: number,
  starting_point: string,
  destination: string,
  description: string,
  distance: number,
  departure: string,
  arrival: string,
  car: CarBasicType | null; 
  custom_transport: string | null,
  delegation_trip_type: DelegationTripTypeType,
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemBasicType
): FormDataType {
  return {
    id: api.id,
    car_id: api.car?.id ?? null,
    starting_point: api.starting_point,
    destination: api.destination,
    description: api.description,
    distance: api.distance,
    departure: api.departure,
    arrival: api.arrival,
    custom_transport: api.custom_transport ?? null,
    delegation_trip_type_id: api.delegation_trip_type.id,
  };
}

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  id: number | null,
  delegation_trip_type_id: number,
  car_id: number | null,
  starting_point: string,
  destination: string,
  description: string,
  distance: number,
  departure: string,
  arrival: string,
  custom_transport: string | null,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  id: null,
  delegation_trip_type_id: 1,
  car_id: null,
  starting_point: "",
  destination: "",
  description: "",
  distance: 1,
  departure: "",
  arrival: "",
  custom_transport: null,
};


// -------------------------------------------------------------------------- //
// Typy błedów formularza
// -------------------------------------------------------------------------- //

export type ErrorDataType = {
  car_id: string[] | null,
  delegation_trip_type_id: string[] | null,
  starting_point: string[] | null,
  destination: string[] | null,
  description: string[] | null,
  distance: string[] | null,
  departure: string[] | null,
  arrival: string[] | null,
  custom_transport: string[] | null,
}

export const DEFAULT_ERROR_DATA = {
  car_id: null,
  delegation_trip_type_id: null,
  starting_point: null,
  destination: null,
  description: null,
  distance: null,
  departure: null,
  arrival: null,
  custom_transport: null,
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

/* export  const hasDateBetween = (toCheckDate: string, delStart: string, delEnd: string) => {
    const date = new Date(toCheckDate).getTime();
    const start = new Date(delStart).getTime();
    const end = new Date(delEnd).getTime();
    return date <= end && date >= start;
};

 */


