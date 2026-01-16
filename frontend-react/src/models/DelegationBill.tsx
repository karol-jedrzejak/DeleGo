
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

export type ItemBasicType = {
    id: number,
    delegation_bill_type: DelegationBillTypeType,    
    description: string,
    amount: number,
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemBasicType
): FormDataType {
  return {
    id: api.id,
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
  delegation_bill_type_id: number,
  description: string,
  amount: number,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  id: null,
  delegation_bill_type_id: 1,
  description: "",
  amount: 0.01,
};

// -------------------------------------------------------------------------- //
// Typy błedów formularza
// -------------------------------------------------------------------------- //

export type ErrorDataType = {
  delegation_bill_type_id: string[] | null,
  description: string[] | null,
  amount: string[] | null,
}

export const DEFAULT_ERROR_DATA = {
  delegation_bill_type_id: null,
  description: null,
  amount: null,
};

