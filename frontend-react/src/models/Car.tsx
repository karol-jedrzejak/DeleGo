import type { ItemFullType as UserType } from "@/models/User"

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    brand: string,
    model: string,
    registration_number: string,
    user_id: null,
    user: UserType | null,
    deleted_at: string,
};

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
    brand: string,
    model: string,
    registration_number: string,
    user_id: string | null,
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
