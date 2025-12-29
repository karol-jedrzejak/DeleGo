import React, { useState,useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/providers/AuthProvider.js";

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Card, Button,Error} from '@/components';

// Model //

import { DEFAULT_FORM_DATA } from '@/models/Car.tsx';
import type { FormDataType } from '@/models/Car.tsx';

import Form from './Form.tsx';

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { carService } from '@/api/services/backend/car/car.service.ts';

// USERS //
import UserSelect from '@/features/user/components/UserSelect.tsx';
import getUsers from '@/features/user/hooks/getUsers.ts';

export default function Create() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const authData = useContext(AuthContext);

    const navigate = useNavigate();   
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    
    // -------------------------------------------------------------------------- //
    // Get Users For Admin
    // -------------------------------------------------------------------------- //

    const { users,loadingUsers,errorUsers } = getUsers(authData.hasPermission('admin','admin'));
    const handleUserChange = (value:number) => {
        setFormData((p) => ({ ...p, user_id: value }));
    };

    /*  
    GDby domyślny nie miał byż brak wyboru
    useEffect(() => {
    if (users && users.length > 0) {
        handleUserChange(users[0].id);
    }
    }, [users]);
    */

    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const { loading, validationErrors, error, mutate } = useBackend("post", carService.paths.create);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutate({data: formData});
            navigate(-1);
        } catch { }
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędów
    // -------------------------------------------------------------------------- //

    if(errorUsers) { return <Error><Error.Text type={errorUsers.type}>{errorUsers.text}</Error.Text></Error>; }
    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
    <div className='flex items-center justify-center'>
        <Card className='w-full xl:w-3/4'>
            <Card.Header>
                <div>Formularz dodania auta</div>
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit} className='w-full'>
                    {authData.hasPermission('admin','admin') && (
                        <UserSelect items={users} value={formData.user_id} loading={loadingUsers} onChange={value => handleUserChange(Number(value))} disabled={false} noneText="Nieprzypisane do pracownika"/>
                    )}
                    <Form formData={formData} setFormData={setFormData} formError={validationErrors}/>
                    <div className='w-full flex justify-end items-center pt-4'>
                        {loading && (
                            <div className="loader w-5 h-5 border-[3px] border-black dark:border-yellow-300"></div>
                        )}
                        <Button
                            className='mx-4 flex items-center'
                            disabled={loading || loadingUsers}
                            type="submit"
                            color="green"
                        >
                            <SquarePlus size={24} className="pe-1"/>
                            Dodaj
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            className='flex items-center'
                            disabled={loading || loadingUsers}
                            color="sky"
                        >
                            <Undo2 size={24} className="pe-1"/>
                            Wstecz
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    </div>
    );
}
