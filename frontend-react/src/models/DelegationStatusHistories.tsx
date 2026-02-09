import type { ItemBasicType as UserBasicType } from '@/models/User';

// -------------------------------------------------------------------------- //
// Typy danych Obektów i odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    user: UserBasicType,
    from_status: string | null,
    to_status: string,
    from_status_label: string,
    to_status_label: string,
    to_status_color: string,
    comment: string | null,
    created_at: string,
};
