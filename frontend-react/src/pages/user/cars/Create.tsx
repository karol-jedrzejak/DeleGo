import React, { useState,useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/providers/AuthProvider.js";

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Card, Button,Error,Spinner} from '@/components';

// Model //

import { DEFAULT_FORM_DATA } from '@/models/Car.tsx';
import type { FormDataType } from '@/models/Car.tsx';

import Form from './Form.tsx';

import type { ItemLookupType as UserLookupType } from "@/models/User";

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { carService } from '@/api/services/backend/user/car.service.ts';

// USERS //
import UserSelect from '@/features/user/components/UserSelect.tsx';

export default function Create() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const authData = useContext(AuthContext);

    const navigate = useNavigate();   
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [errorUsers, setErrorUsers] = useState<string | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Change user (For Admin)
    // -------------------------------------------------------------------------- //

    const handleUserChange = (user: UserLookupType | null  ) => {
        if(user)
        {
            setFormData((p) => ({ ...p, user_id: user.id}));
        } else {
            setFormData((p) => ({ ...p, user_id: null}));
        }
    };

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

    if(errorUsers) { return <Error><Error.Text>{errorUsers}</Error.Text></Error>; }
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
                        <UserSelect onSelect={handleUserChange} onError={() => setErrorUsers("Bład połączenia z serverem")}/>
                    )}
                    <Form formData={formData} setFormData={setFormData} formError={validationErrors}/>
                    <div className='w-full flex justify-end items-center pt-4'>
                        <Button
                            className='mx-4 flex items-center'
                            disabled={loading}
                            type="submit"
                            color="green"
                        >
                            {(loading) ? (
                                <Spinner button={true} buttonClassName="pe-1"/>
                            ):(
                                <SquarePlus size={24} className="pe-1"/>
                            )}
                            Dodaj
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            className='flex items-center'
                            disabled={loading}
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
