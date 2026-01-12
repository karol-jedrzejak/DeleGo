
import type { ItemBasicType as DelegationBillTypeType } from '@/models/DelegationBillType';

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    delegation_id: number,
    delegation_bill_type: DelegationBillTypeType,    
    description: string,
    amount: number,
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    id: api.id,
    delegation_id: api.delegation_id,
    delegation_bill_type_id: api.delegation_bill_type.id,
    description: api.description,
    amount: api.amount,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  id: number | null,
  delegation_id: number | null,
  delegation_bill_type_id: number,
  description: string,
  amount: number,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  id: null,
  delegation_id: null,
  delegation_bill_type_id: null,
  description: "",
  amount: 0.01,
};