import {ADMIN} from "./Routes/adminRoutes";
import {AUTH} from "./Routes/authRoutes";
import {COMPANY} from "./Routes/companyRoutes";
import {DASHBOARD} from "./Routes/dashboardRoutes";
import {NEWS} from "./Routes/newsRoutes";
import {USER} from "./Routes/userRoutes";
import {DELEGATION} from "./Routes/delegationRoutes";

export const ROUTES = {
    ADMIN,
    AUTH,
    COMPANY,
    NEWS,
    DASHBOARD,
    USER,
    DELEGATION
} as const;
