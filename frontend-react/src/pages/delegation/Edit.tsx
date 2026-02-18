
import { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { SquarePen,Undo2,Trash2 } from "lucide-react";
import { Card, Button, Loading, Error, PopUp,Spinner } from '@/components';

// Model //

import { DEFAULT_FORM_DATA, apiToForm } from '@/models/Delegation.tsx';
import type { FormDataType,ItemFullType } from '@/models/Delegation.tsx';
import Form from './Form.tsx';

// API //

import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { delegationService } from '@/api/services/backend/user/delegation.service.ts';



export default function Edit() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [itemData, setItemData] = useState<ItemFullType>();

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemFullType>("get", delegationService.paths.getById(id ?? ""),{ initialLoading: true });

    useEffect(() => {
        mutateGet()
        .then((res) => {
            console.log(res.data);
            setItemData(res.data);
            setFormData(apiToForm(res.data));
        })
        .catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Update
    // -------------------------------------------------------------------------- //

    const { loading: loadingPut, validationErrors, error:errorPut, mutate:mutatePut } = useBackend("put", delegationService.paths.update(id ?? ""));

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
    
    const { loading:loadingDestroy, error:errorDestroy, mutate:mutateDestroy } = useBackend("delete", delegationService.paths.destroy(id ?? ""));

    const handleDestroy = async () => {
        try {
            await mutateDestroy();
            navigate(ROUTES.DELEGATION.INDEX.LINK);
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
                                    disabled={loadingDestroy}
                                    color="cyan"
                                    onClick={() => setDeletePopUp(false)}
                                >
                                    <Undo2 size={24} className="pe-1"/>
                                    Anuluj
                                </Button>
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
                        <div>Formularz edycji delegacji</div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={handleUpdate} className='w-full'>
                            <Form formData={formData} setFormData={setFormData} formError={validationErrors} itemData={itemData}/>
                            <div className='w-full flex justify-between items-center pt-4'>

                                {itemData?.permissions.user_can_delete && (
                                <div>
                                    <Button
                                        className='flex items-center'
                                        disabled={loadingPut}
                                        color="red"
                                        onClick={() => setDeletePopUp(true)}
                                    >
                                        <Trash2 size={24} className="pe-1"/>
                                        Usuń
                                    </Button>
                                </div>
                                )}


                                <div className='flex justify-between items-center gap-2'>
                                    <Button
                                        className='flex items-center'
                                        disabled={loadingPut}
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
