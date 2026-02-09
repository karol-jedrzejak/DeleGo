import type { ItemBasicType as UserBasicType } from '@/models/User';
import type { ItemWithAddressType as CompanyType, ItemNamesOnlyType as CompanyNamesOnlyType } from '@/models/Company';

import type { ItemBasicType as DelegationBillType } from '@/models/DelegationBill';
import type { ItemBasicType as DelegationTripType } from '@/models/DelegationTrip';

import type { FormDataType as FormDelegationBillType } from '@/models/DelegationBill';
import type { FormDataType as FormDelegationTripType } from '@/models/DelegationTrip';

import type { ItemBasicType as DelegationBillBasicType } from '@/models/DelegationBillType';
import type { ItemBasicType as DelegationTripBasicType } from '@/models/DelegationTripType';
import type { ItemFullType as DelegationStatusHistoriesFullType } from '@/models/DelegationStatusHistories';

import { apiToForm as apiToFormDelegationBill } from '@/models/DelegationBill';
import { apiToForm as apiToFormDelegationTrip } from '@/models/DelegationTrip';

export type DelegationOptions = {
    billTypes: DelegationBillBasicType[];
    tripTypes: DelegationTripBasicType[];
};


// -------------------------------------------------------------------------- //
// Subtypy danych
// -------------------------------------------------------------------------- //

export type NumberWithYear = {
  number: number;
  year: number;
};

export type Dates = {
  return: string;
  departure: string;
};

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number;
  number: NumberWithYear;
  settled: boolean;
  status: string;
  status_label: string;
  status_color: string;
  dates: Dates;
  custom_address: string | null;
  description: string;
  user: UserBasicType | null;
  company: CompanyType | null;
  delegation_bills: DelegationBillType[];
  delegation_trips: DelegationTripType[];
  delegation_status_histories: DelegationStatusHistoriesFullType[];
};

export type ItemBasicType = {
  id: number;
  number: NumberWithYear;
  settled: boolean;
  status: string;
  status_label: string;
  status_color: string;
  user_can_edit: boolean;
  dates: Dates;
  custom_address: string | null;
  description: string;
  user: UserBasicType | null; 
  company: CompanyType | null;
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
    settled: api.settled,
    custom_address: api.custom_address,
    description: api.description,
    user_id: api.user?.id ?? null,
    company_id: api.company?.id ?? null,
    delegation_bills: (api.delegation_bills ?? []).map(apiToFormDelegationBill),
    delegation_trips: (api.delegation_trips ?? []).map(apiToFormDelegationTrip),
  };
}

// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  settled: boolean;
  custom_address: string | null;
  description: string;
  user_id: number | null;
  company_id: number | null;
  delegation_bills: FormDelegationBillType[];
  delegation_trips: FormDelegationTripType[];
}

// -------------------------------------------------------------------------- //
// Domyślne wartośći formularza
// -------------------------------------------------------------------------- //

export const DEFAULT_FORM_DATA = {
  settled: false,
  custom_address: null,
  description: "",
  user_id: null,
  company_id: null,
  delegation_bills: [],
  delegation_trips: [],
};

