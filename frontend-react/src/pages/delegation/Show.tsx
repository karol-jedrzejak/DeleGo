import { useState,useEffect,useContext } from "react";
import { Link,useParams } from "react-router-dom"
import { MessageContext } from "@/providers/MessageProvider.js";

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI / Pages //

import { SquarePen,Map,Copy,Users } from "lucide-react";
import { Card, Loading, Button , Error } from '@/components';

// Model //

import type { ItemType } from '@/models/Delegation';

// API //

import { delegationService } from "@/api/services/backend/user/delegation.service";
import { useBackend } from "@/hooks/useLaravelBackend";


const Show = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { setMessage } = useContext(MessageContext);

    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemType | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<ItemType>("get", delegationService.paths.getById(id ?? ""));

    useEffect(() => {
        mutate()
        .then((res) => {
            setItem(res.data);
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
        <>
        {item && (
            <div>
                <div className="lg:flex">
                    <Card className="w-auto lg:w-1/2">
                        <Card.Header>
                            <div>Dane Delegacji</div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="font-normal">
                                        <th className="p-2 w-[180px]">Cecha</th>
                                        <th className="p-2">Wartość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Nazwa skrócona:</td>
                                        <td className="p-2 flex items-center"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                    <Card className="w-auto lg:w-1/2">
                        <Card.Header>
                            <div>Przejazdy</div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="font-normal">
                                        <th className="p-2 w-[250px]">Zasób</th>
                                        <th className="p-2">Wartość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="custom-table-row">
                                        <td className="p-2">?</td>
                                        <td className="p-2">?</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )}</>
    );
    };

export default Show;