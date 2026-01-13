
import { useState, useEffect,useContext,useRef } from 'react';
import { useNavigate,useParams } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";
import { AuthContext } from "@/providers/AuthProvider.js";

// Komponenty UI //

import { ArchiveRestore,SquarePen,Undo2,Trash,Trash2 } from "lucide-react";
import { Card, Button,Error, PopUp,Spinner,Loading } from '@/components';

// Model //

import { DEFAULT_FORM_DATA, apiToForm} from '@/models/Car.tsx';
import type { FormDataType, ItemFullType } from '@/models/Car.tsx';

import Form from './Form.tsx';

import type { ItemLookupType as UserLookupType } from "@/models/User";

// API //

import { carService } from "@/api/services/backend/user/car.service.ts";
import { useBackend } from '@/hooks/useLaravelBackend.ts';

// USERS //
import UserSelect from '@/features/user/components/UserSelect.tsx';

export default function Edit() {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //
    const authData = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const selectedUser = useRef<string>("");
    const [errorUsers, setErrorUsers] = useState<string | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Change user (For Admin)
    // -------------------------------------------------------------------------- //

    const handleUserChange = (user: UserLookupType | null) => {
        if(user)
        {
            setFormData((p) => ({ ...p, user_id: user.id}));
        } else {
            setFormData((p) => ({ ...p, user_id: null}));
        }
    };

    // -------------------------------------------------------------------------- //
    // Get
    // -------------------------------------------------------------------------- //

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemFullType>("get", carService.paths.getById(id ?? ""),{ initialLoading: true });

    useEffect(() => {
        mutateGet()
        .then((res) => {
            setFormData(apiToForm(res.data));
            if(res.data.user)
            {
                selectedUser.current = (res.data.user.names.name+" "+res.data.user.names.surname);
            }
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

    const { loading: loadingPut, validationErrors, error:errorPut, mutate:mutatePut } = useBackend("put", carService.paths.update(id ?? ""));

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
    
    const { loading:loadingDel, error:errorDel, mutate:mutateDel } = useBackend("delete", carService.paths.deactivate(id ?? ""));

    const handleDelete = async () => {
        try {
            await mutateDel();
            navigate(ROUTES.USER.CARS.INDEX.LINK);
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };

    // -------------------------------------------------------------------------- //
    // Admin - Restore
    // -------------------------------------------------------------------------- //

    const { loading: loadingRestore, error:errorRestore, mutate:mutateRestore } = useBackend("put", carService.paths.restore(id ?? ""));

    const handleRestore = async () => {
        try {
            await mutateRestore();
            navigate(ROUTES.USER.CARS.INDEX.LINK);
        } catch {}
    };

    // -------------------------------------------------------------------------- //
    // Admin - Permanently Destroy
    // -------------------------------------------------------------------------- //
    
    const { loading:loadingDestroy, error:errorDestroy, mutate:mutateDestroy } = useBackend("delete", carService.paths.destroy(id ?? ""));

    const handleDestroy = async () => {
        try {
            await mutateDestroy();
            navigate(ROUTES.USER.CARS.INDEX.LINK);
            setDeletePopUp(false);
        } catch {
            setDeletePopUp(false);
        }
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loadingGet || !selectedUser) { return <Loading/>; }

    if(errorGet) { return <Error><Error.Text type={errorGet.type}>{errorGet.text}</Error.Text></Error>; }
    if(errorUsers) { return <Error><Error.Text>{errorUsers}</Error.Text></Error>; }
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
                            <div>Czy na pewno chcesz usunąć to auto?</div>
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
                        <div>Formularz edycji auta</div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={handleUpdate} className='w-full'>
                            {authData.hasPermission('admin','admin') && (
                                <UserSelect onSelect={handleUserChange} initialValue={selectedUser.current} onError={() => setErrorUsers("Bład połączenia z serverem")}/>
                            )}
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
