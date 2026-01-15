import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom"

// Pages //

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Card, Loading , Error, Button } from '@/components';
import { Search } from "lucide-react";
import { CompanyButtons } from "@/features/company/components/CompanyButtons";

// Model //

import type { ItemFullType } from '@/models/Delegation';

// API //

import { delegationService } from "@/api/services/backend/user/delegation.service";
import { useBackend } from "@/hooks/useLaravelBackend";


const Show = () => {


    const formatter = new Intl.NumberFormat("pl-PL", {
        style: 'currency', // Określenie stylu jako waluta
        currency: "PLN", // Określenie kodu waluty (np. 'PLN', 'USD', 'EUR')
    });


    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemFullType | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<ItemFullType>("get", delegationService.paths.getById(id ?? ""));

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
                <div className="flex-wrap grid lg:grid-cols-2">
                    <Card className="lg:col-span-2">
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
                                        <td className="p-2">Numer:</td>
                                        <td className="p-2 flex items-center">
                                            {item.number.year}/{item.number.number}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Osoba:</td>
                                        <td className="p-2 flex items-center">
                                            {item.user?.names.name} {item.user?.names.surname}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Auto:</td>
                                        <td className="p-2 flex items-center">
                                            {item.car ? <>{item.car.brand} {item.car.model} ({item.car.registration_number})</> : "-"}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Opis:</td>
                                        <td className="p-2 flex items-center">
                                            {item.description}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Wyjazd:</td>
                                        <td className="p-2 flex items-center">
                                            {item.dates.departure}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Powrót:</td>
                                        <td className="p-2 flex items-center">
                                            {item.dates.return}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Dystans:</td>
                                        <td className="p-2 flex items-center">
                                            {item.total_distance} km
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Rozliczona:</td>
                                        <td className="p-2 flex items-center">
                                        {item.settled ? (
                                            <span className="px-1 py-0.5 text-white bg-green-800 rounded-md">Tak</span>
                                        ):(
                                            <span className="px-1 py-0.5 text-white bg-red-800 rounded-md">Nie</span>
                                        )}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Address/Firma:</td>
                                        <td className="p-2 flex items-center">
                                            {item.company?.id ? <><CompanyButtons size={1}company={item.company}/></> : ""}
                                            {!item.company?.id ? item.custom_address : ""}
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </Card.Body>
                    </Card>
                    <Card>
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
                                    {item.delegation_trips.map((trip) => (
                                        <tr key={trip.id} className="custom-table-row">
                                            <td className="p-2">{trip.arrival}</td>  
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <div>Rachunki</div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="font-normal">
                                        <th className="p-2">Typ</th>
                                        <th className="p-2">Opis</th>
                                        <th className="p-2">Wartość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.delegation_bills.map((bill) => (
                                        <tr key={bill.id} className="custom-table-row">
                                            <td className="p-2">{bill.delegation_bill_type.name}</td>
                                            <td className="p-2">{bill.description}</td>
                                            <td className="p-2 text-right tabular-nums font-sans">{formatter.format(bill.amount)}</td>       
                                        </tr>
                                    ))}
                                    <tr className="custom-table-sum">
                                        <td colSpan={2} className="p-2 font-normal text-right"><b>SUMA</b></td>
                                        <td className="p-2 text-right tabular-nums font-sans">{formatter.format(item.delegation_bills.reduce((sum, bill) => sum + bill.amount, 0))}</td>       
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
