// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    name: string,
    requires_car: boolean,
    requires_description: boolean,
    created_at: string,
    updated_at: string,
};

export type ItemBasicType = {
    id: number,
    name: string,
    requires_car: boolean,
    requires_description: boolean,
};
