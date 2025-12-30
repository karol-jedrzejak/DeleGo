import type { SearchType, SortType } from '@/api/queryParams/types'
import type { ValidationErrorsType } from '@/api/response/types'

import type { ItemType as CarType } from '@/models/Car';
import type { ItemType as UserType } from '@/models/User';
import type { ItemType as CompanyType } from '@/models/Company';

import type { ItemType as DelegationBillType } from '@/models/DelegationBill';
import type { ItemType as DelegationTripType } from '@/models/DelegationTrip';

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
    'user_id',
    'car_id',
    'company_id',
    'custom_address',
    'description',
    'total_distance',
    'departure',
    'return',
    'settled'
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends "custom_address" ? string | null :
    K extends "user_id" | "car_id" | "company_id" ? number | null :
    K extends "total_distance" ? number :
    K extends "departure" | 'return' ? string :
    K extends "settled" ? boolean :
    string; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    user_id: null,
    car_id: null,
    company_id: null,
    custom_address: "",
    description: "",
    total_distance: 1,
    departure: null,
    return: null,
    settled: false
};

// -------------------------------------------------------------------------- //
// Domyślne SORTOWANIE I WYSZUKIWANIE
// -------------------------------------------------------------------------- //

export const DEFAULT_SORT:SortType = [{
  sortBy: 'return',
  sortDir: 'desc',
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
    car?: CarType,
    user?: UserType,
    company?: CompanyType,
    delegation_bills?: DelegationBillType,
    delegation_trips?: DelegationTripType,
    created_at: string,
    updated_at: string,
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
