// Companies
import CompanyIndex from "@/pages/company/Index";
import CompanyCreate from "@/pages/company/Create";
import CompanyShow from "@/pages/company/Show";
import CompanyEdit from "@/pages/company/Edit";

// Employees
import EmployeeIndex from "@/pages/company/employee/Index"
import EmployeeCreate from "@/pages/company/employee/Create";
import EmployeeShow from "@/pages/company/employee/Show";
import EmployeeEdit from "@/pages/company/employee/Edit"

export const COMPANY = {
    INDEX: {
        PATH:  '/company',
        LINK:  '/company',
        COMPONENT: CompanyIndex,
        PERMISSIONS: {sales:{companies: 1}}
    },
    CREATE: {
        PATH:  '/company/create',
        LINK:  '/company/create',
        COMPONENT: CompanyCreate,
        PERMISSIONS: {sales:{companies: 2}}
    },
    SHOW: {
        PATH:  '/company/:id',
        LINK:  (id: number) => `/company/${id}`,
        COMPONENT: CompanyShow,
        PERMISSIONS: {sales:{companies: 1}}
    },
    EDIT: {
        PATH:  '/company/:id/edit',
        LINK:  (id: number) => `/company/${id}/edit`,
        COMPONENT: CompanyEdit,
        PERMISSIONS: {sales:{companies: 2}}
    },
    EMPLOYEE: {
        INDEX: {
            PATH:  '/company/:parent_id/employee',
            LINK:  (parent_id: number) => `/company/${parent_id}/employee`,
            COMPONENT: EmployeeIndex,
            PERMISSIONS: {sales:{employees: 1}}
        },
        CREATE: {
            PATH:  '/company/:parent_id/employee/create',
            LINK:  (parent_id: number) => `/company/${parent_id}/employee/create`,
            COMPONENT: EmployeeCreate,
            PERMISSIONS: {sales:{employees: 2}}
        },
        SHOW: {
            PATH:  '/company/employee/:id',
            LINK:  (id: number) => `/company/employee/${id}`,
            COMPONENT: EmployeeShow,
            PERMISSIONS: {sales:{employees: 1}}
        },
        EDIT: {
            PATH:  '/company/employee/:id/edit',
            LINK:  (id: number) => `/company/employee/${id}/edit`,
            COMPONENT: EmployeeEdit,
            PERMISSIONS: {sales:{employees: 2}}
        },
    },
} as const;
