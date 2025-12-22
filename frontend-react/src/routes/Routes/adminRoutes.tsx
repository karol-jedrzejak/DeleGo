import UserPermission from "@/pages/admin/UserPermission";

export const ADMIN = {
    USER_PERMISSIONS: {
        PATH:  '/admin/user_permission',
        LINK:  '/admin/user_permission',
        COMPONENT: UserPermission,
        PERMISSIONS:{admin:{admin: 1}}
    },

} as const;
