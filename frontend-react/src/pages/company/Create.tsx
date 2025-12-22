import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Card, Button,Error} from '@/components';

// Model //

import { DEFAULT_FORM_DATA } from '@/models/Company.tsx';
import type { FormDataType } from '@/models/Company.tsx';

import Form from './Form.tsx';

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { companyService } from '@/api/services/backend/company/company.service.ts';



export default function Create() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const navigate = useNavigate();   
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    
    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const { loading, validationErrors, error, mutate } = useBackend("post", companyService.paths.create);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutate({data: formData});
            navigate(-1);
        } catch { }
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu
    // -------------------------------------------------------------------------- //

    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
    <div className='flex items-center justify-center'>
        <Card className='w-full xl:w-3/4'>
            <Card.Header>
                <div>Formularz dodania Firmy</div>
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit} className='w-full'>
                    <Form formData={formData} setFormData={setFormData} formError={validationErrors}/>
                    <div className='w-full flex justify-end items-center pt-4'>
                        {loading && (
                            <div className="loader w-5 h-5 border-[3px] border-black dark:border-yellow-300"></div>
                        )}
                        <Button
                            className='mx-4 flex items-center'
                            disabled={loading}
                            type="submit"
                            color="green"
                        >
                            <SquarePlus size={24} className="pe-1"/>
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
