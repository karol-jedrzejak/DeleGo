import type { SearchType, SortType } from '@/api/queryParams/types'
import type { ValidationErrorsType } from '@/api/response/types'

import type { ItemType as UserType } from "@/models/User"

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
    'user_id',
    'brand',
    'model',
    'registration_number',
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends "user_id" ? number | undefined :
    string; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    brand: "",
    model: "",
    registration_number: "",
    user_id: undefined,
};

// -------------------------------------------------------------------------- //
// Domyślne SORTOWANIE I WYSZUKIWANIE
// -------------------------------------------------------------------------- //

export const DEFAULT_SORT:SortType = [{
    sortBy: 'registration_number',
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
    user?: UserType,
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
