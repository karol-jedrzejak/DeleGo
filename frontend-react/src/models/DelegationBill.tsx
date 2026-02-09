
import type { ItemBasicType as DelegationBillTypeType } from '@/models/DelegationBillType';
import type { ItemFullType as CurrencyType } from '@/models/Currency';

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    id: number,
    date: string,
    delegation_id: number,
    delegation_bill_type: DelegationBillTypeType,    
    description: string,
    currency: CurrencyType,
    amount: number,
};

export type ItemBasicType = {
    id: number,
    date: string,
    delegation_bill_type: DelegationBillTypeType,    
    description: string,
    currency: CurrencyType,
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
    date: api.date,
    delegation_bill_type_id: api.delegation_bill_type.id,
    description: api.description,
    amount: api.amount,
    currency_code: api.currency.code,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  id: number | null,
  date: string,
  delegation_bill_type_id: number,
  description: string,
  amount: number,
  currency_code: string,
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  id: null,
  date: new Date().toISOString().split('T')[0],
  delegation_bill_type_id: 1,
  description: "",
  amount: 0.01,
  currency_code: "PLN",
};

// -------------------------------------------------------------------------- //
// Typy błedów formularza
// -------------------------------------------------------------------------- //

export type ErrorDataType = {
  date: string[] | null,
  delegation_bill_type_id: string[] | null,
  currency_code: string[] | null,
  description: string[] | null,
  amount: string[] | null,
}

export const DEFAULT_ERROR_DATA = {
  date: null,
  delegation_bill_type_id: null,
  currency_code: null,
  description: null,
  amount: null,
};

