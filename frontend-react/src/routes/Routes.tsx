import {ADMIN} from "./Routes/adminRoutes";
import {AUTH} from "./Routes/authRoutes";
import {COMPANY} from "./Routes/companyRoutes";
import {DASHBOARD} from "./Routes/dashboardRoutes";
import {NEWS} from "./Routes/newsRoutes";

export const ROUTES = {
    ADMIN,
    AUTH,
    COMPANY,
    NEWS,
    DASHBOARD,
} as const;
