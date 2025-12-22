
import { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { SquarePen,Undo2,Trash } from "lucide-react";
import { Card, Button, Loading, Error, PopUp } from '@/components';

// Model //

import { DEFAULT_FORM_DATA} from '@/models/Company.tsx';
import type { FormDataType, ItemType } from '@/models/Company.tsx';

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

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemType>("get", companyService.paths.getById(id ?? ""));

    useEffect(() => {
        mutateGet()
        .then((res) => {
            setFormData(res.data);
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
    
    const { loading:loadingDel, error:errorDel, mutate:mutateDel } = useBackend("delete", companyService.paths.delete(id ?? ""));

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
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loadingGet) { return <Loading/>; }
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
                            <div>Czy na pewno chcesz usunąć tę firmę? Operacji nie da się cofnąć.</div>
                            <div className='flex justify-end items-center pt-4'>
                                {loadingDel && (
                                    <div className="loader w-5 h-5 border-[3px] border-black dark:border-yellow-300"></div>
                                )}
                                <Button
                                    className='ms-4 flex items-center'
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
                        <div>Formularz edycji Firmy</div>
                    </Card.Header>
                    <Card.Body>
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
