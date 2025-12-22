import { useEffect } from 'react';
import { useContext } from "react";

import { AuthContext } from "@/providers/AuthProvider.js";

import { Loading } from '@/components';

export default function Logout() {
    const authData = useContext(AuthContext);

    useEffect(() => {
        authData.logout();
    }, []);

    return (
        <Loading fullScreen={true}/>
    );
    }