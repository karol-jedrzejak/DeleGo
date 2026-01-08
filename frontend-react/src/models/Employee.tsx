
// -------------------------------------------------------------------------- //
// Subtypy danych
// -------------------------------------------------------------------------- //
/*
'id' => $this->id,
'company_id' => $this->company_id,
'names' => [
    'name' => $this->name,
    'surname' => $this->surname,
    
],
'position' => $this->position,
'academic_titles' => [
    'academic_titles_before' => $this->academic_titles_before,
    'academic_titles_after' => $this->academic_titles_after,
],
'contact' => [
    'phone_mobile' => $this->phone_mobile,
    'phone_landline' => $this->phone_landline,
    'email' => $this->email,
],
'identity' => [
    'birth_date' => $this->birth_date,
    'birth_place' => $this->birth_place,
    'pesel' => $this->pesel,
    'passport' => $this->passport,
    'id_card' => $this->id_card,
],
'meta' => [
    'created_at' => $this->created_at,
    'deleted_at' => $this->deleted_at,
    'updated_at' => $this->updated_at,
],
*/
export type EmployeeNames = {
  name: string;
  surname: string;
};

export type EmployeeAcademicTitles = {
  academic_titles_before: string | null;
  academic_titles_after: string | null;
};

export type EmployeeContact = {
  phone_mobile: string | null;
  phone_landline: string | null;
  email: string | null;
};

export type EmployeeIdentity = {
  birth_date: string | null;
  birth_place: string | null;
  pesel: string | null;
  passport: string | null;
  id_card: string | null;
};

export type MetaFull = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MetaDeletedOnly = {
  deleted_at: string | null;
};

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
  id: number;
  company_id: number,
  names: EmployeeNames,
  position: string,
  academic_titles: EmployeeAcademicTitles,
  contact: EmployeeContact,
  identity: EmployeeIdentity,
  meta: MetaFull
};

export type ItemBasicType = {
  id: number;
  company_id: number,
  names: EmployeeNames,
  meta: MetaDeletedOnly
};

export type ItemNamesOnlyType = {
  id: number;
  name_surname: string;
};

// -------------------------------------------------------------------------- //
// Mapper Backend -> Formularz
// -------------------------------------------------------------------------- //

export function apiToForm(
  api: ItemFullType
): FormDataType {
  return {
  name: api.names.name,
  surname: api.names.surname,
  academic_titles_before: api.academic_titles.academic_titles_before,
  academic_titles_after: api.academic_titles.academic_titles_after,
  position: api.position,
  phone_mobile: api.contact.phone_mobile,
  phone_landline: api.contact.phone_landline,
  email: api.contact.email,
  birth_date: api.identity.birth_date,
  birth_place: api.identity.birth_place,
  pesel: api.identity.pesel,
  passport: api.identity.passport,
  id_card: api.identity.id_card,
  };
}


// -------------------------------------------------------------------------- //
// Typy danych formularza
// -------------------------------------------------------------------------- //

export type FormDataType = {
  name: string,
  surname: string,
  academic_titles_before: string | null,
  academic_titles_after: string | null,
  position: string | null,
  phone_mobile: string | null,
  phone_landline: string | null,
  email: string | null,
  birth_date: string | null,
  birth_place: string | null,
  pesel: string | null,
  passport: string | null,
  id_card: string | null,
}

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
