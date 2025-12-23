export type ItemType = {
    academic_titles_after: string,
    academic_titles_before: string,
    email: string,
    id: number,
    name: string,
    permissions?: {
        [department: string]: {        
        [resource: string]: string; 
        };
    },
    phone_landline: string,
    phone_mobile: string,
    position: string,
    surname: string,
};

export type ItemsType = ItemType[];
