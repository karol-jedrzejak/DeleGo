import React, { useState, useContext } from 'react';

import logo from "@/assets/logos/app_logo.svg"

import axiosLaravelBackend from '@/api/axiosInstances/axiosLaravelBackend.js'

import { Input, Button ,Spinner } from '@/components';

import { AuthContext } from "@/providers/AuthProvider.js";

interface LoginFormData {
    email: string;
    password: string;
}

type FormErrors = {
    login: string[] | null;
};

export default function Login() {
    const authData = useContext(AuthContext);

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<FormErrors>({login: null });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({login: null });
        setLoading(true);
        try {
            const response = await axiosLaravelBackend.post('login',formData);
            authData.login(response.data.token);
        }  catch (error: any) {
            console.log(error)
            setLoading(false);
            if ((error.data as any)?.message) {
                setError({login: [(error.data as any)?.message]});
            } else {
                setError({login: ["Nieznany błąd."]});
            }
        }
    };

    return (
        <div className="text-black dark:text-white flex justify-center flex-col items-center">
            <img src={logo} className="login-logo w-[80vw] lg:w-[50vw] pb-4 "/>
            <form onSubmit={handleSubmit}>               
                <Input
                    label="E-mail:"   
                    type = "email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    classNameLabel='w-[100px]'
                    classNameInput='lg:w-[300px]'
                    placeholder = "email"   
                    errors={null}
                    autoComplete={"email"}
                    linear={true}
                ></Input> 

                <Input
                    label="Hasło:"   
                    type = "password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    classNameLabel='w-[100px]'
                    classNameInput='lg:w-[300px]'
                    placeholder = "hasło"   
                    errors={error?.login ?? null}
                    autoComplete={"current-password"}
                    linear={true}
                ></Input> 

                <div className='w-full flex justify-center items-center pt-4'>
                    <Button
                        className='me-4'
                        disabled={loading}
                        type="submit"
                    >Zaloguj</Button>
                    {loading && (
                        <Spinner/>
                    )}
                </div>
            </form>
        </div>
    );
}