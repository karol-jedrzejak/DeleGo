
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { SquarePen,Undo2,Trash } from "lucide-react";
import { Card, Button, Loading, Error, PopUp } from '@/components';

import { Buttons as ParentButtons } from '@/features/company/components/Buttons.tsx';

// Model //

import { DEFAULT_FORM_DATA} from '@/models/Employee.tsx';
import type { FormDataType, ItemType } from '@/models/Employee.tsx';
import type { ItemType as ParentItemType } from '@/models/Company.tsx';
import Form from './Form.tsx';

// API //

import { companyService } from "@/api/services/backend/company.service.ts";
import { employeeService } from "@/api/services/backend/employee.service.ts";
import { useBackend } from '@/hooks/useLaravelBackend.ts';


// -------------------------------------------------------------------------- //
// Funkcja komponentu
// -------------------------------------------------------------------------- //

export default function Edit() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const parent_id = useRef<number>(0);
    const navigate = useNavigate();
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);

    const [parent, setParent] = useState<ParentItemType | undefined>(undefined);

    // -------------------------------------------------------------------------- //
    // Get Parent
    // -------------------------------------------------------------------------- //

    const { loading:loadingParent, error:errorParent, mutate:mutateParent } = useBackend<ParentItemType>("get",companyService.paths.getById(""));

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemType>("get", employeeService.paths.getById(id ?? ""));

    useEffect(() => {
        mutateGet()
        .then((res) => {
            setFormData(res.data);
            parent_id.current = res.data.company_id;
            mutateParent({url: companyService.paths.getById(parent_id.current.toString())})
                .then((res) => {
                    setParent(res.data);
                }).catch(() => {});
        })
        .catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Update
    // -------------------------------------------------------------------------- //

    const { loading: loadingPut, validationErrors, error:errorPut, mutate:mutatePut } = useBackend("put", employeeService.paths.update(id ?? ""));

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await mutatePut({data: formData});
            navigate(-1);
        } catch(err) {
        }
    };

    // -------------------------------------------------------------------------- //
    // Delete
    // -------------------------------------------------------------------------- //
    
    const { loading:loadingDel, error:errorDel, mutate:mutateDel } = useBackend("delete", employeeService.paths.delete(id ?? ""));

    const handleDelete = async () => {
        try {
            await mutateDel();
            navigate(ROUTES.COMPANY.EMPLOYEE.INDEX.LINK(parent_id.current));
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loadingGet || loadingParent || !parent) { return <Loading/>; }
    if(errorParent) { return <Error><Error.Text type={errorParent.type}>{errorParent.text}</Error.Text></Error>; }
    if(errorGet) { return <Error><Error.Text type={errorGet.type}>{errorGet.text}</Error.Text></Error>; }
    if(errorPut) { return <Error><Error.Text type={errorPut.type}>{errorPut.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }
    if(errorDel) { return <Error><Error.Text type={errorDel.type}>{errorDel.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
    <>
        {/* -------------------------------------------------------------------------- 
        // PopUp potwierdzenia usunięcia
        -------------------------------------------------------------------------- */}
        {deletePopUp && (
            <PopUp>
                <Card>
                    <Card.Header>
                        <span>Potwierdź</span>
                    </Card.Header>
                    <Card.Body>
                        <div>Czy na pewno chcesz usunąć tego pracownika? Operacji nie da się cofnąć.</div>
                        <div className='flex justify-end items-center pt-4'>
                            <Button
                                className='flex items-center'
                                disabled={loadingDel}
                                color="red"
                                onClick={()=>handleDelete()}
                            >
                                <Trash size={24} className="pe-1"/>
                                Usuń
                            </Button>
                            <Button
                                className='ms-4 flex items-center'
                                disabled={loadingDel}
                                color="cyan"
                                onClick={() => setDeletePopUp(false)}
                            >
                                <Undo2 size={24} className="pe-1"/>
                                Anuluj
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </PopUp>
        )}
        {/* -------------------------------------------------------------------------- 
        // Formularz Edycji
        -------------------------------------------------------------------------- */}
        <div className='flex items-center justify-center'>
            <Card className='w-full xl:w-3/4'>
                <Card.Header>
                    <div>Formularz edycji Pracownika firmy</div>
                </Card.Header>
                <Card.Body>
                    <ParentButtons company={parent}/>
                    <form onSubmit={handleUpdate} className='w-full'>
                        <Form formData={formData} setFormData={setFormData} formError={validationErrors}/>
                        <div className='w-full flex justify-between items-center pt-4'>
                            <div>
                                <Button
                                    className='me-4 flex items-center'
                                    disabled={loadingPut}
                                    color="red"
                                    onClick={() => setDeletePopUp(true)}
                                >
                                    <Trash size={24} className="pe-1"/>
                                    Usuń
                                </Button>
                            </div>
                            <div className='flex justify-between items-center'>
                                {loadingPut && (
                                    <div className="loader w-5 h-5 border-[3px] border-black dark:border-yellow-300"></div>
                                )}
                                <Button
                                    className='mx-4 flex items-center'
                                    disabled={loadingPut}
                                    type="submit"
                                    color="yellow"
                                >
                                    <SquarePen size={24} className="pe-1"/>
                                    Zmień
                                </Button>
                                <Button
                                onClick={() => navigate(-1)}
                                    className='flex items-center'
                                    disabled={loadingPut}
                                    color="sky"
                                >
                                    <Undo2 size={24} className="pe-1"/>
                                    Wstecz
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    </>
    );
}
