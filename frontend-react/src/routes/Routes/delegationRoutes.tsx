// Companies
import DelegationIndex from "@/pages/delegation/Index";

export const DELEGATION = {
    INDEX: {
        PATH:  '/delegation',
        LINK:  '/delegation',
        COMPONENT: DelegationIndex,
        PERMISSIONS: {misc:{delegations: 1}}
    },
    CREATE: {
        PATH:  '/delegation/create',
        LINK:  '/delegation/create',
        COMPONENT: DelegationIndex,
        PERMISSIONS: {misc:{delegations: 1}}
    },
    SHOW: {
        PATH:  '/delegation/:id',
        LINK:  (id: number) => `/delegation/${id}`,
        COMPONENT: DelegationIndex,
        PERMISSIONS: {misc:{delegations: 1}}
    },
    EDIT: {
        PATH:  '/delegation/:id/edit',
        LINK:  (id: number) => `/delegation/${id}/edit`,
        COMPONENT: DelegationIndex,
        PERMISSIONS: {misc:{delegations: 1}}
    },
} as const;
