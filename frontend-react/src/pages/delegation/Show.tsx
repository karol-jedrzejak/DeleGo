import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ROUTES } from "@/routes/Routes.tsx";

import { formatCurrency, formatDateTime } from "@/utils/formatters";

// Komponenty UI //

import { SquarePlus,SquarePen,Search,BookCheck,Undo2 } from "lucide-react";
import pdf_icon from "@/assets/icons/pdf_icon.svg"
import { Button, Card, Loading , Error,PopUp,Select,Input } from '@/components';
import { CompanyButtons } from "@/features/company/components/CompanyButtons";

// Model //

import type { ItemFullType,FormStatusChangeDataType } from '@/models/Delegation';

// API //

import { delegationService } from "@/api/services/backend/user/delegation.service";
import { useBackend } from "@/hooks/useLaravelBackend";


const Show = () => {


    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemFullType | null>(null);

    type StatusListType = {
        value: string,
        label: string,
    };
    const EMPTY_CHANGE_STATUS_FORM:FormStatusChangeDataType = {
        status: "",
        comment: "",
    };

    const [statusOptions, setStatusOptions] = useState<{ text: string; search: { variable: string[], value: string | null }[] }[]>([]);
    const [statusList, setStatusList] = useState<StatusListType[]>([]);
    const [changeStatusPopUp, setChangeStatusPopUp] = useState<boolean>(false);
    const [changeStatusForm, setChangeStatusForm] = useState<FormStatusChangeDataType>(EMPTY_CHANGE_STATUS_FORM);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<ItemFullType>("get", delegationService.paths.getById(id ?? ""));


    const { loading: loadingStatus, error: errorStatus, mutate: mutateStatus } = useBackend<StatusListType[]>(
        "get",
        delegationService.paths.getStatusList
    );
    const { loading: loadingPut, validationErrors, error:errorPut, mutate:mutatePut } = useBackend("put", delegationService.paths.changeStatus("1"));


    useEffect(() => {
        mutate()
        .then((res) => {
            setItem(res.data);
            console.log(res.data);
        })
        .catch(() => {});
        mutateStatus().then((res) => {
            const options = [
                {
                    text: "-",
                    search: [{ variable: ["status"], value: null }],
                },
                ...res.data.map(s => ({
                    text: s.label,
                    search: [{ variable: ["status"], value: s.value }],
                })),
            ];
            setStatusOptions(options);
        });
    }, []);

    // -------------------------------------------------------------------------- //
    // Zmiana statusu delegacji
    // -------------------------------------------------------------------------- //

    const handleStatusChange = async () => {
        // Zaktualizuj status
        try {
            await mutatePut({url: delegationService.paths.changeStatus(String(id)), data: changeStatusForm});
        } catch {}

        // Zaktualizuj formularz
        mutate()
        .then((res) => {
            setItem(res.data);
            console.log(res.data);
        })
        
        // Zamknij pop-up i zresetuj formularz
        setChangeStatusPopUp(false);
        setChangeStatusForm(EMPTY_CHANGE_STATUS_FORM);
    };

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu i Loading
    // -------------------------------------------------------------------------- //

    if(loading) { return <Loading/>; }
    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }
    if(errorStatus) { return <Error><Error.Text type={errorStatus.type}>{errorStatus.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            {changeStatusPopUp && !loadingStatus && (
                <PopUp>
                    <Card className="max-h-[95vh] overflow-y-auto">
                        <Card.Header>
                            <span>Zmiana statusu delegacji</span>
                        </Card.Header>
                        <Card.Body className="w-120"> 
                            <div className='w-full'>
                                <Select
                                    name="delegation_trip_type_id"
                                    label="Nowy Status"
                                    classNameContainer=''
                                    classNameInput='w-full'
                                    onChange={(e) => setChangeStatusForm({...changeStatusForm, status: e.target.value})}
                                >
                                    {statusList.map((status,key) => (
                                        <option key={key} value={status.value}>{status.label}</option>
                                    ))}
                                </Select>
                                <Input
                                    label="Komentarz:"   
                                    type ="text"
                                    name="comment"
                                    value={changeStatusForm.comment}
                                    onChange={(e) => setChangeStatusForm({...changeStatusForm, comment: e.target.value})}
                                    classNameContainer=''
                                    classNameInput="w-full"
                                    placeholder = "komentarz"
                                    required
                                ></Input>
                            </div>
                            <div className='w-full flex justify-end items-center pt-4 gap-2'>
                                <Button
                                    className='flex items-center'
                                    color="yellow"
                                    onClick={() => {handleStatusChange()}}
                                >
                                    <SquarePen size={24} className="pe-1"/>
                                    Aktualizuj
                                </Button>
                                <Button
                                    className='flex items-center'
                                    color="sky"
                                    onClick={() => {setChangeStatusPopUp(false)}}
                                >
                                    <Undo2 size={24} className="pe-1"/>
                                    Anuluj
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </PopUp>
            )}

        {item && (
            <div>
                <div className="flex flex-col">
                    <Card>
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
                                            <span className="me-2">{item.number.year}/{item.number.number}</span>
                                            <div className="me-2">{item.permissions.user_can_edit ? 
                                                <Link to={ROUTES.DELEGATION.EDIT.LINK(item.id)}>
                                                    <Button color="yellow" size={1} className="flex flex-row items-center">
                                                        <SquarePen size={14}/>
                                                        <div className="ps-1">Edytuj</div>
                                                    </Button>
                                                </Link>
                                                : 
                                                <Button color="yellow" size={1} className="flex flex-row items-center" disabled>
                                                    <SquarePen size={14}/>
                                                    <div className="ps-1">Edytuj</div>
                                                </Button>
                                            }</div>
                                            <div className="me-2">
                                                <Button 
                                                    color="teal"
                                                    size={1} className="flex flex-row items-center"
                                                    onClick={() =>{
                                                        setStatusList(item.new_status_options);
                                                        setChangeStatusForm({...changeStatusForm, status: item.new_status_options[0].value});
                                                        setChangeStatusPopUp(true)
                                                    }}
                                                    disabled={loadingStatus || !item.permissions.user_can_change_status}
                                                    >
                                                    <BookCheck size={14}/>
                                                    <div className="ps-1">Zmień status</div>
                                                </Button>
                                            </div>
                                            {item.permissions.user_can_see_pdf_button && (
                                                <>
                                                {item.permissions.user_can_download_pdf ? (
                                                    <Link to={ROUTES.DELEGATION.PDF.LINK(item.id)}>
                                                        <Button color="white" size={1} className="flex flex-row items-center">
                                                            <img src={pdf_icon} className="w-5"/>
                                                        </Button>
                                                    </Link>
                                                ):(
                                                    <Button color="white" size={1} className="flex flex-row items-center" disabled>
                                                        <img src={pdf_icon} className="w-5 opacity-40" />
                                                    </Button>
                                                )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                    {item.user ?
                                    <tr className="custom-table-row">
                                        <td className="p-2">Osoba:</td>
                                        <td className="p-2 flex items-center">
                                            {item.user?.names.name} {item.user?.names.surname}
                                        </td>
                                    </tr> : <></>}
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
                                        <td className="p-2">Status:</td>
                                        <td className="p-2 flex items-center">{item.status_label}</td>
                                    </tr>
                                    <tr className="custom-table-row">
                                        <td className="p-2">Region:</td>
                                        <td className="p-2 flex items-center">
                                            {item.region.region_name}
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
                            <div>Statusy</div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="font-normal">
                                        <th className="p-2">Data</th>
                                        <th className="p-2">Status</th>
                                        <th className="p-2">Komentarz</th>
                                        <th className="p-2">Użytkownik</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.delegation_status_histories.map((status_history,key) => (
                                        <tr className="custom-table-row" key={key}>
                                            <td className="p-2">{formatDateTime(status_history.created_at)}</td>
                                            <td className="p-2">{status_history.to_status_label}</td>
                                            <td className="p-2">{status_history.comment ? status_history.comment : "-"}</td>
                                            <td className="p-2">{status_history.user.names.name} {status_history.user.names.surname}</td>
                                        </tr>
                                    ))}
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
                                        <th className="p-2">Wyjazd</th>
                                        <th className="p-2">Przyjazd</th>
                                        <th className="p-2">Z</th>
                                        <th className="p-2">Do</th>
                                        <th className="p-2">Dystans</th>
                                        <th className="p-2">Transport</th>
                                        <th className="p-2">Opis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.delegation_trips.map((trip) => (
                                        <tr key={trip.id} className="custom-table-row">
                                            <td className="p-2 tabular-nums font-sans">{trip.departure}</td>  
                                            <td className="p-2 tabular-nums font-sans">{trip.arrival}</td>  
                                            <td className="p-2">{trip.starting_point}</td> 
                                            <td className="p-2">{trip.destination}</td>  
                                            <td className="p-2">{trip.distance ? trip.distance+"km" : "-"}</td>  
                                            <td className="p-2">
                                                {trip.delegation_trip_type.requires_car ? 
                                                <>{trip.delegation_trip_type.name+" - "+trip.car?.brand+" "+trip.car?.model+" ["+trip.car?.registration_number+"]"}</> :
                                                <>{trip.delegation_trip_type.name+" - "+trip.custom_transport}</>}
                                            </td>  
                                            <td className="p-2">{trip.description}</td>   
                                        </tr>
                                    ))}
                                    {item.delegation_trips.length<1 ? <tr className="custom-table-row"><td className="p-2 text-center" colSpan={7}>Brak</td></tr> : ""}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                    {item.delegation_bills ? 
                    <Card>
                        <Card.Header>
                            <div>Rachunki</div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="font-normal">
                                        <th className="p-2">Data</th>
                                        <th className="p-2">Typ</th>
                                        <th className="p-2">Opis</th>
                                        <th className="p-2">Wartość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.delegation_bills.map((bill) => (
                                        <tr key={bill.id} className="custom-table-row">
                                            <td className="p-2">{bill.date}</td>
                                            <td className="p-2">{bill.delegation_bill_type.name}</td>
                                            <td className="p-2">{bill.description}</td>
                                            <td className="p-2 text-right tabular-nums font-sans">
                                                {formatCurrency(bill.amount, bill.currency.code)}
                                            </td>          
                                        </tr>
                                    ))}
                                    {item.delegation_trips.length<1 ?
                                        <tr className="custom-table-row"><td className="p-2 text-center" colSpan={3}>Brak</td></tr>
                                        :
                                        <tr className="custom-table-sum">
                                            <td colSpan={3} className="p-2 font-normal text-right"><b>SUMA</b></td>
                                            <td className="p-2 text-right tabular-nums font-sans">{/* {formatter.format(item.delegation_bills.reduce((sum, bill) => sum + bill.amount, 0))} */}</td>       
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                    : ""}
                </div>
            </div>
        )}</>
    );
    };

export default Show;
