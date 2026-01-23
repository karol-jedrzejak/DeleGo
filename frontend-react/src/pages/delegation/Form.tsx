import React, { createContext, useContext, useState,useEffect } from 'react';
import { AuthContext } from "@/providers/AuthProvider.js";

import { Input,Select,Line,Button,PopUp, Card, Spinner } from '@/components';
import { Error as ErrorComponent } from '@/components';
import { SquarePlus,SquarePen,Trash2 } from "lucide-react";


import UserSelect from '@/features/user/components/UserSelect.tsx';
import CompanySelect from '@/features/company/components/CompanySelect.tsx';

import CreateTrip from '@/pages/delegation/delegation_trip/Create.tsx';
import EditTrip from '@/pages/delegation/delegation_trip/Edit.tsx';

import CreateBill from '@/pages/delegation/delegation_bill/Create.tsx';
import EditBill from '@/pages/delegation/delegation_bill/Edit.tsx';

// Model //

import type { ItemFullType,FormDataType } from '@/models/Delegation';

import type { ItemBasicType as DelegationBillBasicType } from '@/models/DelegationBillType';
import type { ItemBasicType as DelegationTripBasicType } from '@/models/DelegationTripType';


import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { delegationService } from '@/api/services/backend/user/delegation.service.ts';

// -------------------------------------------------------------------------- //
// Formatter kwot walutowych
// -------------------------------------------------------------------------- //

const formatter = new Intl.NumberFormat("pl-PL", {
    style: 'currency', // Określenie stylu jako waluta
    currency: "PLN", // Określenie kodu waluty (np. 'PLN', 'USD', 'EUR')
});


// -------------------------------------------------------------------------- //
// Contekst formularza delegacji
// -------------------------------------------------------------------------- //

type DelegationFormContextType = {
    itemData: ItemFullType | null;
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    billTypes: DelegationBillBasicType[];
    tripTypes: DelegationTripBasicType[];
};

const DelegationFormContext = createContext<DelegationFormContextType | null>(null);

export const useDelegationForm = () => {
  const ctx = useContext(DelegationFormContext);
  if (!ctx) throw new Error('useDelegationForm must be used inside DelegationFormContext');
  return ctx;
};

// -------------------------------------------------------------------------- //
// Propsy
// -------------------------------------------------------------------------- //

type FormProps = {
    itemData?: ItemFullType
    formData: FormDataType
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formError: Partial<Record<keyof FormDataType, string[]>> | null
}

export default function Form({formData,setFormData,formError,itemData}:FormProps) {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const authData = useContext(AuthContext);
    const [isCompany, setIsCompany] = useState<boolean>(true);
    const [createDelegationTripPopUp, setCreateDelegationTripPopUp] = useState<boolean>(false);
    const [editDelegationTripPopUp, setEditDelegationTripPopUp] = useState<number | undefined>(undefined);
    
    const [createDelegationBillPopUp, setCreateDelegationBillPopUp] = useState<boolean>(false);
    const [editDelegationBillPopUp, setEditDelegationBillPopUp] = useState<number | undefined>(undefined);

    const [tripOptions, setTripOptions] = useState<DelegationTripBasicType[]>([]);
    const [billOptions, setBillOptions] = useState<DelegationBillBasicType[]>([]);

    // -------------------------------------------------------------------------- //
    // Get options
    // -------------------------------------------------------------------------- //

    const { loading:loadingTripGet, error:errorTripGet, mutate:mutateTripGet } = useBackend<DelegationTripBasicType[]>("get", delegationService.paths.getTripOptions,{ initialLoading: true });

    useEffect(() => {
        mutateTripGet()
        .then((res) => {
            setTripOptions(res.data);
        })
        .catch(() => {});
    }, []);

    const { loading:loadingBillGet, error:errorBillGet, mutate:mutateBillGet } = useBackend<DelegationBillBasicType[]>("get", delegationService.paths.getBillOptions,{ initialLoading: true });

    useEffect(() => {
        mutateBillGet()
        .then((res) => {
            setBillOptions(res.data);
        })
        .catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Basic Change Handlers
    // -------------------------------------------------------------------------- //

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    // -------------------------------------------------------------------------- //
    // Select Handlers
    // -------------------------------------------------------------------------- //

    const handleUserChange = (user_id: number | null ) => {
        setFormData((p) => ({ ...p, user_id: user_id ?? null, car_id: null}));
    };

    const handleAddressChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleCompanyChange = (company_id: number | null ) => {
        setFormData((p) => ({ ...p, company_id: company_id ?? null}));
    };

    const handleDeleteDelegationTrip = (index: number) => {
        setFormData(prev => ({
        ...prev,
        delegation_trips: prev.delegation_trips.filter((_, i) => i !== index),
    }));
    };

    const handleDeleteDelegationBill = (index: number) => {
        setFormData(prev => ({
        ...prev,
        delegation_bills: prev.delegation_bills.filter((_, i) => i !== index),
    }));
    };

    if(loadingBillGet || loadingTripGet){
        return <Spinner/>;
    }

    if(errorBillGet || errorTripGet){
        return <ErrorComponent><ErrorComponent.Text type={"standard"}>Błąd serwera</ErrorComponent.Text></ErrorComponent>;
    }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
        <DelegationFormContext.Provider value={{ itemData: itemData ?? null, formData, setFormData, billTypes: billOptions, tripTypes: tripOptions }}>
            {createDelegationTripPopUp &&(
                <PopUp>
                    <Card>
                        <Card.Header>
                            <span>Dodanie przejazdu do delegacji</span>
                        </Card.Header>
                        <Card.Body>
                            <CreateTrip setPopUp={setCreateDelegationTripPopUp}></CreateTrip>
                        </Card.Body>
                    </Card>
                </PopUp>
            )}
            {editDelegationTripPopUp!== undefined &&(
                <PopUp>
                    <Card>
                        <Card.Header>
                            <span>Edycja przejazdu w delegacji</span>
                        </Card.Header>
                        <Card.Body>
                            <EditTrip id={editDelegationTripPopUp} setPopUp={setEditDelegationTripPopUp}></EditTrip>
                        </Card.Body>
                    </Card>
                </PopUp>
            )}
            {createDelegationBillPopUp &&(
                <PopUp>
                    <Card>
                        <Card.Header>
                            <span>Dodanie rachunku do delegacji</span>
                        </Card.Header>
                        <Card.Body>
                            <CreateBill setPopUp={setCreateDelegationBillPopUp}></CreateBill>
                        </Card.Body>
                    </Card>
                </PopUp>
            )}
            {editDelegationBillPopUp!== undefined &&(
                <PopUp>
                    <Card>
                        <Card.Header>
                            <span>Edycja rachunku w delegacji</span>
                        </Card.Header>
                        <Card.Body>
                            <EditBill id={editDelegationBillPopUp} setPopUp={setEditDelegationBillPopUp}></EditBill>
                        </Card.Body>
                    </Card>
                </PopUp>
            )}



            <Line text="Dane Delegacji"/>
            <div className='w-full'>
            {authData.hasPermission('admin','admin') && (
                <UserSelect onSelect={handleUserChange} initialValue={itemData ? itemData.user?.names.name + " " + itemData.user?.names.surname : ""} />
            )}
            </div>
            <div className='w-full xl:flex xl:flex-row xl:items-end'>
                <label className="inline-flex items-center cursor-pointer p-4">
                    <span className="select-none text-sm font-medium text-heading">Firma</span>
                    <input type="checkbox" value="" className="sr-only peer" onChange={() => {setIsCompany(!isCompany)}}/>
                    <div className="relative mx-3 w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                    <span className="select-none text-sm font-medium text-heading">Address</span>
                </label>
                {isCompany ? (
                    <CompanySelect
                        className='flex-1'
                        onSelect={handleCompanyChange}
                        initialValue={itemData?.company?.names.name_short ?? ""}
                        disabled={formData.custom_address ? true : false}
                />):(
                    <Input
                        label="Address:"   
                        type = "text"
                        name="custom_address"
                        value={formData.custom_address ?? ""}
                        onChange={handleAddressChange}
                        classNameContainer='flex-1'
                        classNameInput="w-full"
                        placeholder = "address"   
                        disabled={formData.company_id ? true : false}
                        errors={formError?.custom_address ?? null}
                    ></Input>
                )}

            </div>
            <div className='w-full xl:flex xl:flex-row xl:gap-x-4'>
                <Input
                    label="Opis:"   
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    classNameContainer='w-full xl:flex-1'
                    classNameInput="w-full"
                    placeholder = "opis"   
                    errors={formError?.description ?? null}
                ></Input>
                <Select
                    label="Rozliczona:"   
                    name="settled"
                    value={formData.settled ? "1" : "0"}
                    onChange={handleChange}
                    classNameContainer='w-full xl:w-40'
                    classNameInput="w-full" 
                    errors={formError?.settled ?? null}
                >
                    <option value="0">Nie</option>
                    <option value="1">Tak</option>
                </Select>
            </div>
            
            <Line text="Przejazdy"/>{/* delegation_trips */}
            <div>
                <Button
                        className='mx-2 my-2 flex items-center'
                        type="button"
                        color="green"
                        onClick={() => {setCreateDelegationTripPopUp(true)}}
                        disabled={!formData.user_id}
                    >
                    <SquarePlus size={22} className="pe-1"/><span>Dodaj Przejazd</span>
                </Button>
            </div>
            <div className='py-4'>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="font-normal">
                            <th className="p-2">Start</th>
                            <th className="p-2">Koniec</th>
                            <th className="p-2">Wyjazd</th>
                            <th className="p-2">Przyjazd</th>
                            <th className="p-2">Opis</th>
                            <th className="p-2">Dystans</th>
                            <th className="p-2">Transport</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {[...formData.delegation_trips]
                        .sort((a, b) =>
                            new Date(a.departure).getTime() - new Date(b.departure).getTime()
                        )
                        .map((trip, index) => (
                            <tr key={index} className="custom-table-row">
                            <td className="p-2">{trip.starting_point}</td>
                            <td className="p-2">{trip.destination}</td>
                            <td className="p-2">{trip.departure.split("T")[0]} - {trip.departure.split("T")[1]}</td>
                            <td className="p-2">{trip.arrival.split("T")[0]} - {trip.arrival.split("T")[1]}</td>
                            <td className="p-2">{trip.description}</td>
                            <td className="p-2">{trip.distance ? trip.distance+" km" : "-"}</td>
                            <td className="p-2">{trip.car_label ? trip.car_label : trip.custom_transport}</td>
                            <td className="p-2 flex flex-row justify-center gap-1">
                                <Button
                                        className='flex items-center'
                                        type="button"
                                        color="yellow"
                                        onClick={() => {setEditDelegationTripPopUp(index)}}
                                    >
                                    <SquarePen size={20}/>
                                </Button>
                                <Button
                                        className='flex items-center'
                                        type="button"
                                        color="red"
                                        onClick={() => {handleDeleteDelegationTrip(index)}}
                                    >
                                    <Trash2 size={20}/>
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Line text="Rachunki"/>{/* delegation_bills */}
            <div>
                <Button
                        className='mx-2 my-2 flex items-center'
                        type="button"
                        color="green"
                        onClick={() => {setCreateDelegationBillPopUp(true)}}
                    >
                    <SquarePlus size={22} className="pe-1"/><span>Dodaj Rachunek</span>
                </Button>
            </div>
            <div className='py-4'>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="font-normal">
                            <th className="p-2">Typ</th>
                            <th className="p-2">Opis</th>
                            <th className="p-2">Kwota</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {[...formData.delegation_bills]
                        .sort((a, b) =>
                            a.amount - b.amount
                        )
                        .map((bill, index) => (
                            <tr key={index} className="custom-table-row">
                            <td className="p-2">{billOptions.find(bt => bt.id === bill.delegation_bill_type_id)?.name}</td>
                            <td className="p-2">{bill.description}</td>
                            <td className="p-2 text-right tabular-nums font-sans">{formatter.format(bill.amount)}</td>
                            <td className="p-2 flex flex-row justify-center gap-1">
                                <Button
                                        className='flex items-center'
                                        type="button"
                                        color="yellow"
                                        onClick={() => {setEditDelegationBillPopUp(index)}}
                                    >
                                    <SquarePen size={20}/>
                                </Button>
                                <Button
                                        className='flex items-center'
                                        type="button"
                                        color="red"
                                        onClick={() => {handleDeleteDelegationBill(index)}}
                                    >
                                    <Trash2 size={20}/>
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DelegationFormContext.Provider>
        </>
    );
}
