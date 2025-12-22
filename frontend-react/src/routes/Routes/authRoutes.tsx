import Logout from "@/pages/auth/Logout";

export const AUTH = {
    LOGIN:
        {
            PATH:  '/login',
            LINK:  '/login',
            COMPONENT: null,
            PERMISSIONS: null
        },
    LOGOUT:
        {
            PATH:  '/logout',
            LINK:  '/logout',
            COMPONENT: Logout,
            PERMISSIONS: null
        },
} as const;
