import Index from "@/pages/user/cars/Index";
import Create from "@/pages/user/cars/Create";
import Edit from "@/pages/user/cars/Edit";

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
            COMPONENT: Create,
            PERMISSIONS: {misc:{cars: 1}}
        },
        EDIT:
        {
            PATH:  '/user/cars/:id/edit',
            LINK:  (id: number) => `/user/cars/${id}/edit`,
            COMPONENT: Edit,
            PERMISSIONS: {misc:{cars: 1}}
        },
    }
} as const;
