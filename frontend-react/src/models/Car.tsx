import type { ItemBasicType as UserType } from "@/models/User"

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    brand: string,
    model: string,
    registration_number: string,
    user: UserType | null,
    deleted_at: string,
};

export type ItemBasicType = {
    id: number,
    brand: string,
    model: string,
    registration_number: string,
    user: UserType | null,
};

export type ItemLookupType = {
    id: number,
    name: string,
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    brand: api.brand,
    model: api.model,
    registration_number: api.registration_number,
    user_id: api.user?.id ?? null,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
    brand: string,
    model: string,
    registration_number: string,
    user_id: number | null,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
    brand: "",
    model: "",
    registration_number: "",
    user_id: null,
};
