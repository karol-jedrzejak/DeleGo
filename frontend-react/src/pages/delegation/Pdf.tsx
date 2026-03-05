import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"

// Komponenty UI //

import { Loading , Error } from '@/components';

// Model //

import type { ItemFullType } from '@/models/Delegation';

// API //

import { delegationService } from "@/api/services/backend/user/delegation.service";
import { useBackend } from "@/hooks/useLaravelBackend";


const Pdf = () => {


    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemFullType | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<ItemFullType>("get", delegationService.paths.getPdf(id ?? ""));

    useEffect(() => {
        mutate()
        .then((res) => {
            setItem(res.data);
            console.log(res);
            console.log(res.data);
        })
        .catch(() => {});
    }, []);


    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loading) { return <Loading/>; }
    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }
    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <div className="flex flex-col gap-4">TEST DELEGACJA PDF</div>
    );
    };

export default Pdf;
