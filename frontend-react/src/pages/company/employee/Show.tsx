import { useState,useEffect,useContext } from "react";
import { Link,useParams } from "react-router-dom"
import { MessageContext } from "@/providers/MessageProvider.js";
import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI / Pages //

import { Search,Map,Copy,SquarePen,Phone,Mail } from "lucide-react";
import { Card, Loading, Button , Error } from '@/components';

// Model //

import type { ItemType } from '@/models/Employee.tsx';
import type { ItemType as ParentItemType } from '@/models/Company.tsx';

// API //

import { companyService } from "@/api/services/backend/company/company.service";
import { employeeService } from "@/api/services/backend/company/employee.service";
import { useBackend } from "@/hooks/useLaravelBackend";

// Utilities //

import { formatAddress } from "@/features/company/utilities/formatAddress";
import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";

const Show = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { setMessage } = useContext(MessageContext);
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemType | null>(null);
    const [parent, setParent] = useState<ParentItemType | null>(null);
    const [offerText, setOfferText] = useState<string>("");

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading:loadingItem, error:errorItem, mutate:mutateItem } = useBackend<ItemType>("get", employeeService.paths.getById(id ?? ""));
    const { loading: loadingParent, error: errorParent, mutate: mutateParent } = useBackend<ParentItemType>("get", companyService.paths.getById("1"));

    useEffect(() => {
        let  item:ItemType;
        mutateItem()
        .then((resItem) => {
            item = resItem.data;
            setItem(resItem.data);
            let parent_id = resItem.data.company_id.toString();
            if (parent_id) {
                return mutateParent({url: companyService.paths.getById(parent_id)});
            }
            return Promise.reject("Brak company_id");
        })
        .then((resParent) => {
            setParent(resParent.data);
            setOfferText(formatOfferData({parent: resParent.data,child: item}))
        })
        .catch(() => {})
        
    }, [id]);

    // -------------------------------------------------------------------------- //
    // Formatowanie danych do oferty
    // -------------------------------------------------------------------------- //

    const formatOfferData = ({parent,child}:{parent: ParentItemType|null,child: ItemType|null}) => {
        const lines: string[] = [];
        if(parent && child)
        {
            lines.push(parent.name_complete ? parent.name_complete : "");
            lines.push(formatAddress(parent).split(";")[0]);
            lines.push(formatAddress(parent).split(";")[1].trimStart());
            lines.push("");

            if(child.position) lines.push(child.position)
            lines.push("Szanowny/a Pan/Pani");

            const fullName = [
                child.academic_titles_before?.trim(),
                child.name,
                child.surname,
                child.academic_titles_after?.trim(),
            ].join(" ");

            lines.push(fullName);
            if (child.email) lines.push(`E-mail: ${child.email}`);
            if (child.phone_mobile) lines.push(`Kom: ${child.phone_mobile}`);
            if (child.phone_landline) lines.push(`Tel: ${child.phone_landline}`);
        }
        return lines.join("\n");
    }

    // -------------------------------------------------------------------------- //
    // Kopiowanie do schowka
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

    if(loadingItem || loadingParent) { return <Loading/>; }
    if(errorItem) { return <Error><Error.Text type={errorItem?.type}>{errorItem?.text}</Error.Text></Error>; }
    if(errorParent) { return <Error><Error.Text type={errorParent?.type}>{errorParent?.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
        {item && parent && (
            <div>
                <div className="flex">
                    <Card className="w-full">
                        <Card.Header>
                            <div>Pracownik - {item.name} {item.surname}</div>
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
                                        <td className="p-2">Imię i Nazwisko:</td>
                                        <td className="p-2 flex items-center">
                                            <div>{item.academic_titles_before} {item.name} {item.surname} {item.academic_titles_after}</div>
                                            <Link to={ROUTES.COMPANY.EMPLOYEE.EDIT.LINK(item.id)} className="ps-2">
                                                <Button
                                                size={1} color="yellow" className="flex flex-row items-center">
                                                    <SquarePen size={14}/>
                                                    <div className="ps-1">Edytuj</div>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Stanowisko:</td>
                                        <td className="p-2">{item.position}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">E-mail:</td>
                                        <td className="p-2">
                                            {item.email ? (
                                                <Button
                                                onClick={() => {window.location.href = "mailto:"+item.email+"?subject=Temat";}}
                                                size={1} color="teal" className="flex flex-row items-center"
                                                >
                                                    <Mail size={16}/>
                                                    <div className="ps-1">{item.email}</div>
                                                </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Komórka:</td>
                                        <td className="p-2">
                                            {item.phone_mobile ? (
                                                <Button
                                                onClick={() => {window.location.href = "tel:"+item.phone_mobile;}}
                                                size={1} color="lime" className="flex flex-row items-center"
                                                >
                                                    <Phone size={16}/>
                                                    <div className="ps-1">{item.phone_mobile}</div>
                                                    
                                                </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Telefon Stacjonarny::</td>
                                        <td className="p-2">
                                            {item.phone_landline ? (
                                                <Button
                                                onClick={() => {window.location.href = "tel:"+item.phone_landline;}}
                                                size={1} color="lime" className="flex flex-row items-center"
                                                >
                                                    <Phone size={16}/>
                                                    <div className="ps-1">{item.phone_landline}</div>
                                                    
                                                </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Firma - Nazwa:</td>
                                        <td className="p-2 flex items-center">
                                            <div>{parent.name_short}</div>                         
                                            <Link to={ROUTES.COMPANY.SHOW.LINK(parent.id)} className="ps-2">
                                                <Button 
                                                size={1} color="sky" className="flex flex-row items-center">
                                                    <Search size={14}/>
                                                    <div className="ps-1">Info</div>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Firma - Adres:</td>
                                        <td className="p-2">
                                                <Button
                                                color="teal" size={1} className="flex flex-row items-center"
                                                onClick={() => window.open(buildCompanyGoogleMapsUrl(parent), "_blank")}
                                                >
                                                    <Map size={14}/>
                                                    <div className="ps-1">{formatAddress(parent)}</div>
                                                    
                                                </Button>
                                        </td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Dane do schowka:</td>
                                        <td className="p-2 flex flex-row gap-2 items-center">
                                            
                                            <Button
                                            color="purple" size={2}
                                            className="flex flex-row items-center"
                                            onClick={() => copyToClipboard(offerText)}
                                            >
                                                    <Copy size={18}/>
                                            </Button>
                                            <textarea
                                            className="flex-1 bg-white text-black dark:bg-neutral-700 dark:text-white rounded-md p-2 whitespace-nowrap w-100 overflow-visible h-60 resize-none border border-neutral-400 dark:border-0"
                                            value={offerText}
                                            readOnly/>
                                        </td>
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