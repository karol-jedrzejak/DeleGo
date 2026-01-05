import type { ValidationErrorsType } from '@/api/response/types'

import type { ItemType as DelegationBillTypeType } from '@/models/DelegationBillType';

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
    'delegation_bill_type_id',
    'description',
    'amount',
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends "amount" ? number :
    string; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    description: "",
    amount: 0.01,
    delegation_bill_type_id: "",
};

// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemType = FormDataType &{
    id: number,
    delegation_id: number,
    delegation_bill_type?: DelegationBillTypeType,
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
