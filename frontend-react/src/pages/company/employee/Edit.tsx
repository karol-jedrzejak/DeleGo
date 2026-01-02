
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { ArchiveRestore,SquarePen,Undo2,Trash,Trash2 } from "lucide-react";
import { Card, Button, Loading, Error, PopUp,Spinner} from '@/components';

import { Buttons as ParentButtons } from '@/features/company/components/Buttons.tsx';

// Model //

import { DEFAULT_FORM_DATA} from '@/models/Employee.tsx';
import type { FormDataType, ItemType } from '@/models/Employee.tsx';
import type { ItemType as ParentItemType } from '@/models/Company.tsx';
import Form from './Form.tsx';

// API //

import { companyService } from "@/api/services/backend/company/company.service.ts";
import { employeeService } from "@/api/services/backend/company/employee.service.ts";
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
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const [parent, setParent] = useState<ParentItemType | undefined>(undefined);

    // -------------------------------------------------------------------------- //
    // Get Parent
    // -------------------------------------------------------------------------- //

    const { loading:loadingParent, error:errorParent, mutate:mutateParent } = useBackend<ParentItemType>("get",companyService.paths.getById(""),{ initialLoading: true });

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemType>("get", employeeService.paths.getById(id ?? ""),{ initialLoading: true });

    useEffect(() => {
        mutateGet()
        .then((res) => {
            setFormData(res.data);
            if(res.data.deleted_at)
            {
                setIsDeleted(true);
            }
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
    
    const { loading:loadingDel, error:errorDel, mutate:mutateDel } = useBackend("delete", employeeService.paths.deactivate(id ?? ""));

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
    // Admin - Restore
    // -------------------------------------------------------------------------- //

    const { loading: loadingRestore, error:errorRestore, mutate:mutateRestore } = useBackend("put", employeeService.paths.restore(id ?? ""));

    const handleRestore = async () => {
        try {
            await mutateRestore();
            navigate(ROUTES.COMPANY.EMPLOYEE.INDEX.LINK(parent_id.current));
        } catch {}
    };

    // -------------------------------------------------------------------------- //
    // Admin - Permanently Destroy
    // -------------------------------------------------------------------------- //
    
    const { loading:loadingDestroy, error:errorDestroy, mutate:mutateDestroy } = useBackend("delete", employeeService.paths.destroy(id ?? ""));

    const handleDestroy = async () => {
        try {
            await mutateDestroy();
            navigate(ROUTES.COMPANY.EMPLOYEE.INDEX.LINK(parent_id.current));
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };


    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loadingGet || loadingParent) { return <Loading/>; }

    if(errorParent) { return <Error><Error.Text type={errorParent.type}>{errorParent.text}</Error.Text></Error>; }
    
    if(errorGet) { return <Error><Error.Text type={errorGet.type}>{errorGet.text}</Error.Text></Error>; }
    if(errorPut) { return <Error><Error.Text type={errorPut.type}>{errorPut.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }
    if(errorDel) { return <Error><Error.Text type={errorDel.type}>{errorDel.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }
    
    if(errorRestore) { return <Error><Error.Text type={errorRestore.type}>{errorRestore.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }
    if(errorDestroy) { return <Error><Error.Text type={errorDestroy.type}>{errorDestroy.text}</Error.Text><Error.Special><Button onClick={() => navigate(0)}>Wróc do edycji</Button></Error.Special></Error>; }
    
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
                        <div>Czy na pewno chcesz usunąć tego pracownika ?</div>
                        <div className='flex justify-end items-center pt-4'>
                            <Button
                                className='ms-4 flex items-center'
                                disabled={loadingDel || loadingDestroy}
                                color="cyan"
                                onClick={() => setDeletePopUp(false)}
                            >
                                <Undo2 size={24} className="pe-1"/>
                                Anuluj
                            </Button>
                            {isDeleted ? (
                            <Button
                                className='ms-4 flex items-center'
                                disabled={loadingDestroy}
                                color="red"
                                onClick={()=>handleDestroy()}
                            >
                                {(loadingDestroy) ? (
                                    <Spinner button={true} buttonClassName="pe-1"/>
                                ):(
                                    <Trash2 size={24} className="pe-1"/>
                                )}
                                Usuń z bazy danych
                            </Button>
                            ):(
                            <Button
                                className='ms-4 flex items-center'
                                disabled={loadingDel}
                                color="red"
                                onClick={()=>handleDelete()}
                            >
                                {(loadingDel) ? (
                                    <Spinner button={true} buttonClassName="pe-1"/>
                                ):(
                                    <Trash size={24} className="pe-1"/>
                                )}
                                Usuń
                            </Button>
                            )}
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
                                {isDeleted ? (
                                <div className='flex flex-row gap-2'>
                                <Button
                                    className='flex items-center'
                                    disabled={loadingPut || loadingRestore}
                                    color="green"
                                    onClick={() => handleRestore()}
                                >
                                    {(loadingRestore) ? (
                                        <Spinner button={true} buttonClassName="pe-1"/>
                                    ):(
                                        <ArchiveRestore size={24} className="pe-1"/>
                                    )}
                                    Przywróć
                                </Button>
                                <Button
                                    className='flex items-center'
                                    disabled={loadingPut || loadingRestore}
                                    color="red"
                                    onClick={() => setDeletePopUp(true)}
                                >
                                    <Trash2 size={24} className="pe-1"/>
                                    Usuń z bazy danych
                                </Button>
                                </div>
                                ):(
                                <Button
                                    className='me-4 flex items-center'
                                    disabled={loadingPut || loadingRestore}
                                    color="red"
                                    onClick={() => setDeletePopUp(true)}
                                >
                                    <Trash size={24} className="pe-1"/>
                                    Usuń
                                </Button>
                                )}
                            </div>
                            <div className='flex justify-between items-center gap-2'>
                                {loadingPut && (
                                    <Spinner/>
                                )}
                                <Button
                                    className='flex items-center'
                                    disabled={loadingPut || loadingRestore}
                                    type="submit"
                                    color="yellow"
                                >
                                    {(loadingPut) ? (
                                        <Spinner button={true} buttonClassName="pe-1"/>
                                    ):(
                                        <SquarePen size={24} className="pe-1"/>
                                    )}
                                    Zmień
                                </Button>
                                <Button
                                onClick={() => navigate(-1)}
                                    className='flex items-center'
                                    disabled={loadingPut || loadingRestore}
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
