import React, { useContext,useState } from 'react';
import { AuthContext } from "@/providers/AuthProvider.js";


import { Input,Select,Line,Button } from '@/components';
import { SquarePlus } from "lucide-react";


import UserSelect from '@/features/user/components/UserSelect.tsx';
import CarSelect from '@/features/user/components/CarSelect.tsx';
import CompanySelect from '@/features/company/components/CompanySelect.tsx';

// Model //

import type { ItemFullType,FormDataType } from '@/models/Delegation';
import type {
    FormDataType as DelegationBillFormDataType,
    ErrorDataType as DelegationBillErrorDataType
} from '@/models/DelegationBill';
import type {
    FormDataType as DelegationTripFormDataType,
    ErrorDataType as DelegationTripErrorDataType
} from '@/models/DelegationTrip';

import {
    DEFAULT_FORM_DATA as DELEGATION_BILL_DEFAULT_FORM_DATA,
    DEFAULT_ERROR_DATA as DELEGATION_BILL_DEFAULT_ERROR_DATA
} from '@/models/DelegationBill';

import {
    DEFAULT_FORM_DATA as DELEGATION_TRIP_DEFAULT_FORM_DATA,
    DEFAULT_ERROR_DATA as DELEGATION_TRIP_DEFAULT_ERROR_DATA
} from '@/models/DelegationTrip';



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

    const [currentDelegationTrip, setCurrentDelegationTrip] = useState<DelegationTripFormDataType>(DELEGATION_TRIP_DEFAULT_FORM_DATA);
    const [currentDelegationBill, setCurrentDelegationBill] = useState<DelegationBillFormDataType>(DELEGATION_BILL_DEFAULT_FORM_DATA);


    const [currentDelegationTripErrors, setCurrentDelegationTripErrors] = useState<DelegationTripErrorDataType>(DELEGATION_TRIP_DEFAULT_ERROR_DATA);
    const [currentDelegationBillErrors, setCurrentDelegationBillErrors] = useState<DelegationBillErrorDataType>(DELEGATION_BILL_DEFAULT_ERROR_DATA);

    // -------------------------------------------------------------------------- //
    // Chceck for trip overlap
    // -------------------------------------------------------------------------- //

    const hasTripOverlap = (
        toCheckTrip:DelegationTripFormDataType,
        trips: DelegationTripFormDataType[]
        ) => {
        const newStart = new Date(toCheckTrip.departure).getTime();
        const newEnd = new Date(toCheckTrip.arrival).getTime();

        return trips.some(trip => {
            const start = new Date(trip.departure).getTime();
            const end = new Date(trip.arrival).getTime();

            return newStart < end && newEnd > start;
        });
    };

    const hasDateBetween = (toCheckDate: string) => {
        const date = new Date(toCheckDate).getTime();

        const start = new Date(formData.departure).getTime();
        const end = new Date(formData.return).getTime();

        return date <= end && date >= start;
    };

    // -------------------------------------------------------------------------- //
    // Trip Handlers
    // -------------------------------------------------------------------------- //

    const handleTripChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setCurrentDelegationTrip((p) => ({ ...p, [name]: value }));
    };

    const handleAddTrip = () => {

        let arrival_array: string[] = [];
        let departure_array: string[] = [];

        // Validate overlap with main dates
        if (!hasDateBetween(currentDelegationTrip.arrival)) {
           arrival_array.push("Data przyjazdu poza zakresem delegacji.");
        }
        if (!hasDateBetween(currentDelegationTrip.departure)) {
           departure_array.push("Data wyjazdu poza zakresem delegacji.");
        }

        // Validate overlap with other trip dates
        if (hasTripOverlap(currentDelegationTrip, formData.delegation_trips)) {
            arrival_array.push("Daty pokrywają się z inna datą.");
            departure_array.push("Daty pokrywają się z inna datą.");
        }

        // Valide description length
        if(currentDelegationTrip.description.length < 3)
        {
            setCurrentDelegationTripErrors((p) => ({ ...p, description: ['Opis musi mieć co najmniej 3 znaki'] }));
        }

        // Valide starting_point length
        if(currentDelegationTrip.starting_point.length < 3)
        {
            setCurrentDelegationTripErrors((p) => ({ ...p, starting_point: ['Punkt wyjazdu musi mieć co najmniej 3 znaki'] }));
        }

        // Valide destination point length
        if(currentDelegationTrip.destination.length < 3)
        {
            setCurrentDelegationTripErrors((p) => ({ ...p, destination: ['Punkt docelowy musi mieć co najmniej 3 znaki'] }));
        }

        if(arrival_array.length > 0 || departure_array.length > 0)
        {
            setCurrentDelegationTripErrors((p) => ({ ...p, arrival: arrival_array, departure: departure_array }));
            return;
        }

        // Clear errors
        setCurrentDelegationTripErrors(DELEGATION_TRIP_DEFAULT_ERROR_DATA);

        // Update form data
        setFormData(prev => ({
            ...prev,
            delegation_trips: [
                ...prev.delegation_trips,
                currentDelegationTrip,
            ],
        }));

    };

    // -------------------------------------------------------------------------- //
    // Bill Handlers
    // -------------------------------------------------------------------------- //

    const handleBillChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setCurrentDelegationBill((p) => ({ ...p, [name]: value }));
    };

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

    const handleCarChange = (car_id: number | null ) => {
        setFormData((p) => ({ ...p, car_id: car_id ?? null}));
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

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='w-full'>
            {authData.hasPermission('admin','admin') && (
                <UserSelect onSelect={handleUserChange} initialValue={itemData?.user} />
            )}
            </div>
            <div className='w-full grid grid-cols-3 xl:gap-x-4'>
                <CarSelect
                    className='col-span-3 xl:col-span-2'
                    onSelect={handleCarChange}
                    initialValue={itemData?.car}
                    user_id={formData.user_id}/>
                <Input
                    label="Przejechanych km (auto służbowe):"   
                    type = "number"
                    name="total_distance"
                    value={formData.total_distance ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-3 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "dystans w km"   
                    errors={formError?.total_distance ?? null}
                    unit="km"
                    step="1"
                    min="1"
                    max="9999"
                ></Input>
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
                        initialValue={itemData?.company}
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
            <div className='w-full flex-wrap grid grid-cols-2 xl:gap-x-4'>
                <Input
                    label="Wyjazd:"   
                    type="datetime-local"
                    name="departure"
                    value={formData.departure}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    errors={formError?.departure ?? null}
                    required
                ></Input>
                <Input
                    label="Powrót:"   
                    type="datetime-local"
                    name="return"
                    value={formData.return}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full" 
                    errors={formError?.return ?? null}
                    min={formData.departure}
                    disabled={formData.departure ? false : true}
                    required
                ></Input>
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
            <div className='flex gap-x-4 justify-center items-end'>           
                <div className='flex-1 w-full grid grid-cols-4 xl:gap-x-4'>
                    <Input
                        label="Punkt Startowy:"   
                        type ="text"
                        name="starting_point"
                        value={currentDelegationTrip.starting_point}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-1'
                        classNameInput="w-full"
                        placeholder = "miejsce początkowe"
                        disabled={formData.departure && formData.return ? false : true}
                        errors={currentDelegationTripErrors.starting_point ?? null}
                        required
                    ></Input>
                    <Input
                        label="Punkt Końcowy:"   
                        type ="text"
                        name="destination"
                        value={currentDelegationTrip.destination}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-1'
                        classNameInput="w-full" 
                        placeholder = "miejsce końcowe"
                        disabled={formData.departure && formData.return ? false : true}
                        errors={currentDelegationTripErrors.destination ?? null}
                        required
                    ></Input>
                    <Input
                        label="Wyjazd:"   
                        type="datetime-local"
                        name="departure"
                        value={currentDelegationTrip.departure}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-1'
                        classNameInput="w-full"
                        disabled={formData.departure && formData.return ? false : true}
                        min={formData.departure}
                        max={formData.return}
                        errors={currentDelegationTripErrors.departure ?? null}
                        required
                    ></Input>
                    <Input
                        label="Przyjazd:"   
                        type="datetime-local"
                        name="arrival"
                        value={currentDelegationTrip.arrival}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-1'
                        classNameInput="w-full"
                        disabled={formData.departure && formData.return ? false : true} 
                        min={formData.departure}
                        max={formData.return}
                        errors={currentDelegationTripErrors.arrival ?? null}
                        required
                    ></Input>
                    <Input
                        label="Opis:"   
                        type ="text"
                        name="description"
                        value={currentDelegationTrip.description}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-3'
                        classNameInput="w-full"
                        placeholder='opis'
                        disabled={formData.departure && formData.return ? false : true}
                        errors={currentDelegationTripErrors.description ?? null}
                        required
                    ></Input>
                    <Input
                        label="Dystans:"   
                        type ="number"
                        name="distance"
                        value={currentDelegationTrip.distance}
                        onChange={handleTripChange}
                        classNameContainer='col-span-4 xl:col-span-1'
                        classNameInput="w-full" 
                        unit={"km"}
                        disabled={formData.departure && formData.return ? false : true}
                        errors={currentDelegationTripErrors.distance ?? null}
                        required
                    ></Input>
                </div>
                <div>
                    <Button
                            className='mx-2 my-2 flex items-center'
                            type="button"
                            color="green"
                            onClick={handleAddTrip}
                            disabled={formData.departure && formData.return ? false : true}
                        >
                        <SquarePlus size={22}/>
                    </Button>
                </div>
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
                            <td className="p-2">{trip.distance} km</td>
                            <td className="p-2">
                                <Button>del</Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Line text="Rachunki"/>{/* delegation_bills */}

            {/* export type FormDataType = {
            id: number | null,
            delegation_bill_type_id: number,
            description: string,
            amount: number,
            }

            export type ItemBasicType = {
                id: number,
                name: string,
            };
            */}

            <Button
                    className='mx-2 my-2 flex items-center'
                    type="button"
                    color="blue"
                    onClick={() => console.log(formData)}
                >
                TEST - CONSOLE LOG
            </Button>
        </>
    );
}
