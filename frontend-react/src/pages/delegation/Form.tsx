import React, { createContext, useContext, useState,useEffect } from 'react';
import { AuthContext } from "@/providers/AuthProvider.js";

import { Input,Select,Line,Button,PopUp, Card, Spinner } from '@/components';
import { Error as ErrorComponent } from '@/components';
import { SquarePlus,SquarePen,Trash2 } from "lucide-react";

import { formatCurrency } from "@/utils/formatters";

import UserSelect from '@/features/user/components/UserSelect.tsx';
import CompanySelect from '@/features/company/components/CompanySelect.tsx';

import CreateTrip from '@/pages/delegation/delegation_trip/Create.tsx';
import EditTrip from '@/pages/delegation/delegation_trip/Edit.tsx';

import CreateBill from '@/pages/delegation/delegation_bill/Create.tsx';
import EditBill from '@/pages/delegation/delegation_bill/Edit.tsx';

// Model //

import type { ItemFullType,FormDataType,DelegationOptions } from '@/models/Delegation';
import type { ItemFullType as CurrencyType } from '@/models/Currency';


import { useBackend } from '@/hooks/useLaravelBackend.ts';
import { delegationService } from '@/api/services/backend/user/delegation.service.ts';
import { currencyService } from '@/api/services/backend/dictionaries/currency.service';

// -------------------------------------------------------------------------- //
// Contekst formularza delegacji
// -------------------------------------------------------------------------- //

type DelegationFormContextType = {
    itemData: ItemFullType | null;
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    delegationOptions: DelegationOptions;
    currencyTypes: CurrencyType[];
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
    const [isCompany, setIsCompany] = useState<boolean>(itemData?.company ? true : false);
    const [createDelegationTripPopUp, setCreateDelegationTripPopUp] = useState<boolean>(false);
    const [editDelegationTripPopUp, setEditDelegationTripPopUp] = useState<number | undefined>(undefined);
    
    const [createDelegationBillPopUp, setCreateDelegationBillPopUp] = useState<boolean>(false);
    const [editDelegationBillPopUp, setEditDelegationBillPopUp] = useState<number | undefined>(undefined);

    const [delegationOptions, setDelegationOptions] = useState<DelegationOptions>({
        billTypes: [],
        tripTypes: [],
    });
    const [currencyOptions, setCurrencyOptions] = useState<CurrencyType[]>([]);

    // -------------------------------------------------------------------------- //
    // Get options
    // -------------------------------------------------------------------------- //

    const { loading:loadingOptionsGet, error:errorOptionsGet, mutate:mutateOptionsGet } = useBackend<DelegationOptions>("get", delegationService.paths.getOptions,{ initialLoading: true });

    useEffect(() => {
        mutateOptionsGet()
        .then((res) => {
            setDelegationOptions(res.data);
        })
        .catch(() => {});
    }, []);

    const { loading:loadingCurrencyGet, error:errorCurrencyGet, mutate:mutateCurrencyGet } = useBackend<CurrencyType[]>("get", currencyService.paths.getOptions,{ initialLoading: true });

    useEffect(() => {
        mutateCurrencyGet()
        .then((res) => {
            setCurrencyOptions(res.data);
            console.log(authData);
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

    const getBillError = (index: number) => {
    return Object.entries(formError ?? {})
        .find(([key]) => key.startsWith(`delegation_bills.${index}.`))
        ?.[1]?.[0];
    };



    if(loadingOptionsGet || loadingCurrencyGet){
        return <Spinner/>;
    }

    if(errorOptionsGet || errorCurrencyGet){
        return <ErrorComponent><ErrorComponent.Text type={"standard"}>Błąd serwera</ErrorComponent.Text></ErrorComponent>;
    }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
        <DelegationFormContext.Provider value={{ itemData: itemData ?? null, formData, setFormData, delegationOptions: delegationOptions, currencyTypes: currencyOptions}}>
            {createDelegationTripPopUp &&(
                <PopUp>
                    <Card className="max-h-[95vh] overflow-y-auto">
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
                <UserSelect
                    onSelect={handleUserChange}
                    initialValue={itemData ? itemData?.user?.names.name + " " + itemData?.user?.names.surname : ""}
                    errors={formError?.user_id ?? null}
                />
            )}
            </div>
        {authData.hasPermission('sales','companies',11) ? (
            <div className='w-full xl:flex xl:flex-row xl:items-end'>
                <div>
                    <label className="inline-flex items-center cursor-pointer p-4">
                        <span className="select-none text-sm font-medium text-heading">Firma</span>
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => {setIsCompany(!isCompany)}}
                            checked={!isCompany} 
                        />
                        <div className="relative mx-3 w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                        <span className="select-none text-sm font-medium text-heading">Address</span>
                    </label>
                    {formError?.company_id || formError?.custom_address ? <div className='text-red-600 my-2 text-center text-sm hidden xl:block'>&nbsp;</div> : ""}
                </div>
                {isCompany ? (
                    <CompanySelect
                        className='flex-1'
                        onSelect={handleCompanyChange}
                        initialValue={itemData ? itemData?.company?.names.name_short : ""}
                        disabled={formData.custom_address ? true : false}
                        errors={formError?.company_id ?? null}
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
        ):(
            <div className='w-full xl:flex xl:flex-row xl:items-end'>
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
            </div>
        )}
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
                        disabled={authData.hasPermission('admin','admin') && !formData.user_id}
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
                        {formData.delegation_trips.length<1 ? <tr className="custom-table-row"><td className="p-2 text-center" colSpan={8}>Brak</td></tr> : ""}
                    </tbody>
                </table>
            </div>

            {formError?.delegation_trips?.length && (
            <div className="text-red-600 my-2 text-center text-sm">
                {formError.delegation_trips.map((error, key) => (
                <span key={key}>{error}</span>
                ))}
            </div>
            )}

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
                            <th className="p-2">Data</th>
                            <th className="p-2">Typ</th>
                            <th className="p-2">Opis</th>
                            <th className="p-2">Kwota</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {formData.delegation_bills
                            .map((bill, index) => {
                                const error = getBillError(index);
                                return (
                                    <React.Fragment key={index}>
                                        <tr className="custom-table-row">
                                            <td className="p-2">{bill.date}</td>
                                            <td className="p-2">
                                                {delegationOptions.billTypes.find(bt => bt.id === bill.delegation_bill_type_id)?.name}
                                            </td>
                                            <td className="p-2">{bill.description}</td>
                                            <td className="p-2 text-right tabular-nums font-sans">
                                                {formatCurrency(bill.amount, bill.currency_code)}
                                            </td>
                                            <td className="p-2 flex flex-row justify-center gap-1">
                                                <Button color="yellow" onClick={() => setEditDelegationBillPopUp(index)}>
                                                    <SquarePen size={20} />
                                                </Button>
                                                <Button color="red" onClick={() => handleDeleteDelegationBill(index)}>
                                                    <Trash2 size={20} />
                                                </Button>
                                            </td>
                                        </tr>

                                        {error && (
                                        <tr>
                                            <td colSpan={4} className="text-red-600 text-sm text-center pb-2">
                                                {error}
                                            </td>
                                        </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        }
                        {formData.delegation_bills.length<1 ? <tr className="custom-table-row"><td className="p-2 text-center" colSpan={4}>Brak</td></tr> : ""}
                    </tbody>
                </table>
            </div>
    
        </DelegationFormContext.Provider>
        </>
    );
}
