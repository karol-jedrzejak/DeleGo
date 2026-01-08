
import { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { ArchiveRestore,SquarePen,Undo2,Trash,Trash2 } from "lucide-react";
import { Card, Button, Loading, Error, PopUp,Spinner } from '@/components';

// Model //

import { DEFAULT_FORM_DATA} from '@/models/Company.tsx';
import type { FormDataType, ItemFullType } from '@/models/Company.tsx';

import Form from './Form.tsx';

// API //

import { companyService } from "@/api/services/backend/company/company.service.ts";
import { useBackend } from '@/hooks/useLaravelBackend.ts';


export default function Edit() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemFullType>("get", companyService.paths.getById(id ?? ""),{ initialLoading: true });

    useEffect(() => {
        mutateGet()
        .then((res) => {
            setFormData(res.data);
            if(res.data.deleted_at)
            {
                setIsDeleted(true);
            }
        })
        .catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Update
    // -------------------------------------------------------------------------- //

    const { loading: loadingPut, validationErrors, error:errorPut, mutate:mutatePut } = useBackend("put", companyService.paths.update(id ?? ""));

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await mutatePut({data: formData});
            navigate(-1);
        } catch {}
    };

    // -------------------------------------------------------------------------- //
    // Delete
    // -------------------------------------------------------------------------- //
    
    const { loading:loadingDel, error:errorDel, mutate:mutateDel } = useBackend("delete", companyService.paths.deactivate(id ?? ""));

    const handleDelete = async () => {
        try {
            await mutateDel();
            navigate(ROUTES.COMPANY.INDEX.LINK);
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };

    // -------------------------------------------------------------------------- //
    // Admin - Restore
    // -------------------------------------------------------------------------- //

    const { loading: loadingRestore, error:errorRestore, mutate:mutateRestore } = useBackend("put", companyService.paths.restore(id ?? ""));

    const handleRestore = async () => {
        try {
            await mutateRestore();
            navigate(ROUTES.COMPANY.INDEX.LINK);
        } catch {}
    };

    // -------------------------------------------------------------------------- //
    // Admin - Permanently Destroy
    // -------------------------------------------------------------------------- //
    
    const { loading:loadingDestroy, error:errorDestroy, mutate:mutateDestroy } = useBackend("delete", companyService.paths.destroy(id ?? ""));

    const handleDestroy = async () => {
        try {
            await mutateDestroy();
            navigate(ROUTES.COMPANY.INDEX.LINK);
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loadingGet) { return <Loading/>; }
    
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
                            <div>Czy na pewno chcesz usunąć tę firmę?</div>
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
                        <div>Formularz edycji Firmy</div>
                    </Card.Header>
                    <Card.Body>
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
