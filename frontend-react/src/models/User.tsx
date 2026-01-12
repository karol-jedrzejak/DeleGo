
// -------------------------------------------------------------------------- //
// Subtypy danych
// -------------------------------------------------------------------------- //

export type UserNames = {
  name: string;
  surname: string;
};

export type UserAcademicTitles = {
  before: string | null;
  after: string | null;
};

export type UserContact = {
  phone_mobile: string | null;
  phone_landline: string | null;
  email: string;
};

// -------------------------------------------------------------------------- //
// Typy odpowiedzi z backendu
// -------------------------------------------------------------------------- //

export type ItemFullType = {
    academic_titles: UserAcademicTitles,
    contact: UserContact,
    id: number,
    names: UserNames,
    permissions: {
        [department: string]: {        
            [resource: string]: number; 
        };
    },
    position: string,
};

export type ItemBasicType = {
    id: number,
    names: UserNames,
};

export type ItemLookupType = {
    id: number,
    name_surname: string,
};
