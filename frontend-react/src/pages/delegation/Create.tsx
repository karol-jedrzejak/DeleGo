import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Card, Button,Error,Spinner} from '@/components';

// Model //

import { DEFAULT_FORM_DATA } from '@/models/Delegation.tsx';
import type { FormDataType } from '@/models/Delegation.tsx';
import Form from './Form.tsx';

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { delegationService } from '@/api/services/backend/user/delegation.service.ts';


export default function Create() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const navigate = useNavigate();   
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    
    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const { loading, validationErrors, error, mutate } = useBackend("post", delegationService.paths.create);

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

    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
    <div className='flex items-center justify-center'>
        <Card className='w-full xl:w-3/4'>
            <Card.Header>
                <div>Formularz dodania delegacji</div>
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit} className='w-full'>
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
