import type { ItemFullType as CarType } from '@/models/Car';
import type { ItemBasicType as UserType } from '@/models/User';
import type { ItemWithAddressType as CompanyType } from '@/models/Company';

import type { FormDataType as DelegationBillType } from '@/models/DelegationBill';
import type { FormDataType as DelegationTripType } from '@/models/DelegationTrip';

// -------------------------------------------------------------------------- //
// Subtypy danych
// -------------------------------------------------------------------------- //

export type NumberWithYear = {
  number: number;
  year: number;
};

export type Dates = {
  return: string;
  departure: string;
};

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number;
  numbers: NumberWithYear;
  settled: boolean;
  dates: Dates;
  custom_address: string | null;
  description: string;
  user: UserType | null;
  car: CarType | null;  
  company: CompanyType | null;
  total_distance: number;
  delegation_bills: DelegationBillType[];
  delegation_trips: DelegationTripType[];
};

export type ItemBasicType = {
  id: number;
  numbers: NumberWithYear;
  settled: boolean;
  dates: Dates;
  custom_address: string | null;
  description: string;
  user: UserType | null;
  car: CarType | null;  
  company: CompanyType | null;
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    settled: api.settled,
    return: api.dates.return,
    departure: api.dates.departure,
    custom_address: api.custom_address,
    description: api.description,
    user_id: api.user?.id ?? null,
    car_id: api.car?.id ?? null,
    company_id: api.company?.id ?? null,
    total_distance: api.total_distance,
    delegation_bills: api.delegation_bills,
    delegation_trips: api.delegation_trips,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  settled: boolean;
  return: string;
  departure: string;
  custom_address: string | null;
  description: string;
  user_id: number | null;
  car_id: number | null;
  company_id: number | null;
  total_distance: number;
  delegation_bills: DelegationBillType[];
  delegation_trips: DelegationTripType[];
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  settled: false,
  return: "",
  departure: "",
  custom_address: null,
  description: "",
  user_id: null,
  car_id:  null,
  company_id: null,
  total_distance: 0,
  delegation_bills: [],
  delegation_trips: [],
};

