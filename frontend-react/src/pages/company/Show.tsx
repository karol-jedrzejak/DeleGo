import { useState,useEffect,useContext } from "react";
import { Link,useParams } from "react-router-dom"
import { MessageContext } from "@/providers/MessageProvider.js";

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI / Pages //

import { SquarePen,Map,Copy,Users } from "lucide-react";
import { Card, Loading, Button , Error } from '@/components';

// Model //

import type { ItemFullType } from '@/models/Company.tsx';

// API //

import { companyService } from "@/api/services/backend/company/company.service";
import { useBackend } from "@/hooks/useLaravelBackend";

// Utilities //

import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";
import { formatAddress } from "@/features/company/utilities/formatAddress";


const Show = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { setMessage } = useContext(MessageContext);

    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemFullType | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<ItemFullType>("get", companyService.paths.getById(id ?? ""));

    useEffect(() => {
        mutate()
        .then((res) => {
            setItem(res.data);
        })
        .catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Kopiowanie tekstu do schowka
    // -------------------------------------------------------------------------- //

    async function copyToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            setMessage({status: "success", text: "Skopiowano tekst do schowka."})
        } catch (err) {
            setMessage({status: "error", text: "Błąd kopiowania tekstu do schowka"})
        }
    }

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
                            <div>Firma - Dane Firmy</div>
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
                                        <td className="p-2 flex items-center">       
                                            <div>{item.names.name_short}</div>                    
                                            <Link to={ROUTES.COMPANY.EDIT.LINK(item.id)} className="ps-2">
                                                <Button color="yellow" size={1} className="flex flex-row items-center">
                                                    <SquarePen size={14}/>
                                                    <div className="ps-1">Edytuj</div>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Nazwa pełna:</td>
                                        <td className="p-2">{item.names.name_complete}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Adres:</td>
                                        <td className="p-2">
                                                <Button
                                                color="teal" size={1} className="flex flex-row items-center"
                                                onClick={() => window.open(buildCompanyGoogleMapsUrl(item.address), "_blank")}
                                                >
                                                    <Map size={14}/>
                                                    <div className="ps-1">{formatAddress(item.address)}</div>
                                                    
                                                </Button>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Region / Kraj:</td>    
                                        <td className="p-2">{item.address.region} / {item.address.country}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">NIP:</td>
                                        <td className="p-2">{item.identifiers.nip ?? "Brak"}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">KRS:</td>
                                        <td className="p-2">{item.identifiers.krs ?? "Brak"}</td>
                                    </tr>
                                    <tr className="custom-table-row">    
                                        <td className="p-2">REGON:</td>
                                        <td className="p-2">{item.identifiers.regon ?? "Brak"}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Współrzędnie GPS:</td>
                                        <td className="p-2">{item.geo.latitude} N, {item.geo.longitude} W</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Odległość i dojazd:</td>
                                        <td className="p-2">{item.distance && item.distance.distance_time ? (item.distance+" km, "+item.distance.distance_time+" min") : ("Brak Danych")}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Dane do schowka:</td>
                                        <td className="p-2 flex flex-row gap-2 items-center">
                                            <Button
                                            color="purple" size={2}
                                            className="flex flex-row items-center"
                                            onClick={() => copyToClipboard(item.names.name_complete+`\n`+formatAddress(item.address).split(";")[0]+`\n`+formatAddress(item.address).split(";")[1].trimStart())}
                                            >
                                                    <Copy size={18}/>
                                            </Button>
                                            <textarea
                                            className="bg-white text-black dark:bg-neutral-700 dark:text-white rounded-md p-2 flex-1 h-20 resize-none border border-neutral-400 dark:border-0"
                                            value={item.names.name_complete+`\n`+formatAddress(item.address).split(";")[0]+`\n`+formatAddress(item.address).split(";")[1].trimStart()}
                                            readOnly/>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Pracownicy:</td>
                                        <td className="p-2">
                                            <Link to={ROUTES.COMPANY.EMPLOYEE.INDEX.LINK(item.id)} className="">
                                                <Button color="sky" size={2} className="flex flex-row items-center">
                                                    <Users size={14}/>
                                                    <div className="ps-1">Lista Pracowników</div>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                    <Card className="w-auto lg:w-1/2">
                        <Card.Header>
                            <div>Firma - Zasoby</div>
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