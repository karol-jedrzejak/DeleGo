import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from "@/routes/Routes.tsx";

import axiosTsBackend from '@/api/axiosInstances/axiosLaravelBackend';

type User = {
    id: number,
    name: string,
    surname: string,
    phone_mobile: string,
    phone_landline: string,
    academic_titles_before: string,
    academic_titles_after: string,
    email: string,
    permissions: {
        [module: string]: {
            [permission: string]: number;
        };
    }
}

type AuthContextType = {
  user: User | null,
  loadingUser: boolean,
  login: (token: string) => void;
  logout: () => void;
  hasPermission: (module: string, permission: string, requiredLevel?: number) => boolean;
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType>({
    user: null,
    loadingUser: true,
    login: () => {},
    logout: () => {},
    hasPermission: () => false,
});

type Props = {
  children: React.ReactNode;
};

// AuthProvider component
const AuthProvider = ({ children }: Props) => {

    const navigate = useNavigate();

    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const response = await axiosTsBackend.get('user');
            setUser(response.data);
            setLoadingUser(false);
        } catch {
            setUser(null);
        }
    };

    // Login function
    const login = (token: string) => {
        localStorage.setItem('token', token);
        getUser();
        navigate(ROUTES.DASHBOARD.LINK);
        setLoadingUser(false);
    };

    // Logout function
    const logout = async () => {
        try {
            const response = await axiosTsBackend.post('logout');
            console.log(response)
        } catch {
        }
        localStorage.removeItem('token');
        setUser(null);
        navigate(ROUTES.AUTH.LOGIN.PATH);
        setLoadingUser(false);
    };

    const hasPermission = (module: string, permission: string, requiredLevel: number = 1): boolean => {
        if (!user || !user.permissions) return false;

        const modulePermissions = user.permissions[module];
        if (!modulePermissions) return false;

        const level = modulePermissions[permission] || 0;
        return level >= requiredLevel;
    };


    useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            getUser();
        } else {
            logout();
        }
    };
        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loadingUser, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };