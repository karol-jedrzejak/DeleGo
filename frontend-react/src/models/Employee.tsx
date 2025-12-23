import type { SearchType, SortType } from '@/api/queryParams/types'
import type { ValidationErrorsType } from '@/api/response/types'

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export const formDataKeys = [
/*   'company_id', */
  'name',
  'surname',
  'academic_titles_before',
  'academic_titles_after',
  'position',
  'phone_mobile',
  'phone_landline',
  'email',
  'birth_date',
  'birth_place',
  'pesel',
  'passport',
  'id_card',
] as const;


export type FormDataType = {
  [K in typeof formDataKeys[number]]: 
    K extends 'name' | 'surname' ? string :
    string | null; // domyślnie string
};

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    'name': '',
    'surname': '',
    'position': null,
    'academic_titles_before': null,
    'academic_titles_after': null,
    'phone_mobile': null,
    'phone_landline': null,
    'email': null,
    'birth_date': null,
    'birth_place': null,
    'pesel': null,
    'passport': null,
    'id_card': null,
};

// -------------------------------------------------------------------------- //
// Domyślne SORTOWANIE I WYSZUKIWANIE
// -------------------------------------------------------------------------- //

export const DEFAULT_SORT:SortType = [{
  sortBy: 'name_short',
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
    company_id: number,
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
