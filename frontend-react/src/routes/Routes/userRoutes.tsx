import Index from "@/pages/user/cars/Index";

export const USER = {
    CARS:
    {
        INDEX:
        {
            PATH:  '/user/cars',
            LINK:  '/user/cars',
            COMPONENT: Index,
            PERMISSIONS: {misc:{cars: 1}}
        },
        CREATE:
        {
            PATH:  '/user/cars/create',
            LINK:  '/user/cars/create',
            COMPONENT: Index,
            PERMISSIONS: {misc:{cars: 1}}
        },
        EDIT:
        {
            PATH:  '/user/cars/:id/edit',
            LINK:  (id: number) => `/user/cars/${id}/edit`,
            COMPONENT: Index,
            PERMISSIONS: {misc:{cars: 1}}
        },
    }
} as const;
