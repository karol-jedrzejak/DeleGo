// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemType = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
};

export type DataType = ItemType[];
