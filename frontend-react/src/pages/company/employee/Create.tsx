
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Card, Button,Error, Loading,Spinner} from '@/components';

import { Buttons as ParentButtons } from '@/features/company/components/Buttons.tsx';

// Model //

import type { ItemFullType as ParentItemType } from '@/models/Company.tsx';

import { DEFAULT_FORM_DATA } from '@/models/Employee.tsx';
import type { FormDataType } from '@/models/Employee.tsx';

import Form from './Form.tsx';

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { employeeService } from '@/api/services/backend/company/employee.service.ts';
import { companyService } from "@/api/services/backend/company/company.service.ts";

// -------------------------------------------------------------------------- //
// Funkcja komponentu Create
// -------------------------------------------------------------------------- //

export default function Create() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const { parent_id } = useParams<{ parent_id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [ parent, setParent] = useState<ParentItemType | undefined>(undefined);

    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const { loading:loadingItem, validationErrors, error:errorItem, mutate:mutateItem } = useBackend("post", employeeService.paths.create(parent_id ?? ""));
    const { loading:loadingParent, error:errorParent, mutate:mutateParent } = useBackend<ParentItemType>("get",companyService.paths.getById(parent_id ?? ""));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutateItem({data: formData});
            navigate(-1);
        } catch { }
    };

    useEffect(() => {
        mutateParent()
            .then((res) => {
                setParent(res.data);
            }).catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu
    // -------------------------------------------------------------------------- //

    if(loadingParent || !parent) { return <Loading/>; }
    if(errorParent) { return <Error><Error.Text type={errorParent.type}>{errorParent.text}</Error.Text></Error>; }
    if(errorItem) { return <Error><Error.Text type={errorItem.type}>{errorItem.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
    <div className='flex items-center justify-center'>
        <Card className='w-full xl:w-3/4'>
            <Card.Header>
                <div>Formularz dodania pracownika do firmy {parent.name_complete}</div>
            </Card.Header>
            <Card.Body>
                <ParentButtons company={parent}/>
                <form onSubmit={handleSubmit} className='w-full mt-2'>
                <Form formData={formData} setFormData={setFormData} formError={validationErrors}/>
                <div className='w-full flex justify-end items-center pt-4 gap-2'>
                    <Button
                        className='flex items-center'
                        disabled={loadingItem}
                        type="submit"
                        color="green"
                    >
                        {(loadingItem) ? (
                            <Spinner button={true} buttonClassName="pe-1"/>
                        ):(
                             <SquarePlus size={24} className="pe-1"/>
                        )}
                        Dodaj
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        className='flex items-center'
                        disabled={loadingItem}
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
