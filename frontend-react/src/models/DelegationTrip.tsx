import type { ValidationErrorsType } from '@/api/response/types'

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
    'starting_point',
    'destination',
    'description',
    'distance',
    'departure',
    'arrival',
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends "distance" ? number :
    K extends "departure" | 'arrival' ? string :
    string; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    starting_point: "",
    destination: "",
    description: "",
    distance: 1,
    departure: null,
    arrival: null,
};

// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemType = FormDataType & {
    id: number,
    delegation_id: number,
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
