import React from 'react';

// Components //    
import { Input,Select } from '@/components';

// Model //

import type { FormDataType as DelegationFormDataType } from '@/models/Delegation';

import type { FormDataType } from '@/models/DelegationTrip';
import { hasTripOverlap } from '@/models/DelegationTrip';

import CarSelect from '@/features/user/components/CarSelect.tsx';

import { useDelegationForm } from '../Form.tsx';

import type { ItemBasicType as DelegationTripBasicType } from '@/models/DelegationTripType';


// -------------------------------------------------------------------------- //
// Validation
// -------------------------------------------------------------------------- //

type ValidationProps = {
    formData: DelegationFormDataType
    tripFormData: FormDataType
    setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
    tripTypes: DelegationTripBasicType[]
    id?:number
}

export const validate = ({formData,tripFormData,setFormErrors,tripTypes,id}:ValidationProps) => {

    setFormErrors(null);
    let error = false;

    // Validate overlap with other trip dates
    if (hasTripOverlap(tripFormData, formData.delegation_trips,id)) {
        error=true;
        setFormErrors((p) => ({ ...p, arrival: ["Daty pokrywają się z inna datą."], departure: ["Daty pokrywają się z inna datą."] }));
    }

    // Sprawdź czy są daty
    if(!tripFormData.departure)
    {
        error=true;
        setFormErrors((p) => ({ ...p, departure: ['Uzupełnij datę początkową.'] }));
    }
    if(!tripFormData.arrival)
    {
        error=true;
        setFormErrors((p) => ({ ...p, arrival: ['Uzupełnij datę końcową.'] }));
    }
    // Sprawdź czy są daty
    if(tripFormData.arrival <= tripFormData.departure)
    {
        error=true;
        setFormErrors((p) => ({ ...p, arrival: ['Data jest przed datą wyjazdu.'] }));
    }

    // Valide description length
    if(tripFormData.description.length < 3)
    {
        error=true;
        setFormErrors((p) => ({ ...p, description: ['Opis musi mieć co najmniej 3 znaki'] }));
    }

    // Valide starting_point length
    if(tripFormData.starting_point.length < 3)
    {
        error=true;
        setFormErrors((p) => ({ ...p, starting_point: ['Punkt wyjazdu musi mieć co najmniej 3 znaki'] }));
    }

    // Valide destination point length
    if(tripFormData.destination.length < 3)
    {
        error=true;
        setFormErrors((p) => ({ ...p, destination: ['Punkt docelowy musi mieć co najmniej 3 znaki'] }));
    }

    const selectedTripType = tripTypes.find(t => t.id === tripFormData.delegation_trip_type_id);

    if(selectedTripType?.requires_car)
    {
        if(!tripFormData.car_id)
        {
            error=true;
            setFormErrors((p) => ({ ...p, car_id: ['Wybierz auto.'] }));
        }

        if(!tripFormData.distance || tripFormData.distance < 1)
        {
            error=true;
            setFormErrors((p) => ({ ...p, distance: ['Uzupełnij dystans w km.'] }));
        }
    }

    if (selectedTripType?.requires_description) {
        if (!tripFormData.custom_transport || tripFormData.custom_transport.length < 3) {
            error = true;
            setFormErrors(p => ({
            ...p,
            custom_transport: ['Opis transportu musi mieć przynajmniej 3 znaki.'],
            }));
        }
    }

    return !error;
};

// -------------------------------------------------------------------------- //
// Form
// -------------------------------------------------------------------------- //

type FormErrors =  Partial<Record<keyof FormDataType, string[]>> | null;

type FormProps = {
    tripFormData: FormDataType
    setTripFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formError: FormErrors
}


export default function Form({ tripFormData,setTripFormData,formError}:FormProps) {

    const { itemData,tripTypes } = useDelegationForm();

    // -------------------------------------------------------------------------- //
    // Handlery zmian
    // -------------------------------------------------------------------------- //

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setTripFormData((p) => ({ ...p, [name]: value }));
    };

    // -------------------------------------------------------------------------- //
    // Select Handlers
    // -------------------------------------------------------------------------- //

    const handleTransportChange = (transport_id: string) => {
        setTripFormData((p) => ({ ...p, car_id: null, car_label: "", custom_transport: null, distance: null, delegation_trip_type_id: Number(transport_id)}));
    };

    const handleCarChange = (car_id: number | null, car_label: string | null) => {
        setTripFormData((p) => ({ ...p, car_id: car_id ?? null, car_label: car_label ?? ""}));
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='w-full grid grid-cols-4 xl:gap-x-4'>
                <Select
                name="delegation_trip_type_id"
                label="Rodzaj Transportu"
                classNameContainer='col-span-4 xl:col-span-1'
                classNameInput='w-full'
                defaultValue={tripFormData.delegation_trip_type_id}
                onChange={(e) => handleTransportChange(e.target.value)}
                >
                    {tripTypes.map( (trip_type,key) => (
                        <option key={key} value={trip_type.id}>{trip_type.name}</option>
                    ))}
                </Select>
                {tripTypes.find(t => t.id === tripFormData.delegation_trip_type_id)?.requires_description ? (
                    <Input
                        label="Tranport opis:"   
                        type ="text"
                        name="custom_transport"
                        value={tripFormData.custom_transport ?? ""}
                        onChange={handleChange}
                        classNameContainer='col-span-4 xl:col-span-3'
                        classNameInput="w-full"
                        placeholder = "transport - opis własny"
                        errors={formError?.custom_transport ?? null}
                        required
                    ></Input>
                ) :(<></>)
                }
                {tripTypes.find(t => t.id === tripFormData.delegation_trip_type_id)?.requires_car ? (
                    <>
                <CarSelect
                    className='col-span-4 xl:col-span-2'
                    onSelect={handleCarChange}
                    initialValue={tripFormData.car_label}
                    user_id={itemData?.user?.id ?? null}
                    errors={formError?.car_id ?? null}
                    />
                <Input
                    label="Dystans:"   
                    type ="number"
                    name="distance"
                    value={tripFormData.distance ?? 0}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-1'
                    classNameInput="w-full" 
                    unit={"km"}
                    min={0}
                    errors={formError?.distance ?? null}
                    required
                ></Input>
                </>
                ):(<></>)}
            </div>
            <div className='w-full grid grid-cols-4 xl:gap-x-4'>
                <Input
                    label="Punkt Startowy:"   
                    type ="text"
                    name="starting_point"
                    value={tripFormData.starting_point}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    placeholder = "miejsce początkowe"
                    errors={formError?.starting_point ?? null}
                    required
                ></Input>
                <Input
                    label="Punkt Końcowy:"   
                    type ="text"
                    name="destination"
                    value={tripFormData.destination}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full" 
                    placeholder = "miejsce końcowe"
                    errors={formError?.destination ?? null}
                    required
                ></Input>
                <Input
                    label="Wyjazd:"   
                    type="datetime-local"
                    name="departure"
                    value={tripFormData.departure}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    errors={formError?.departure ?? null}
                    max={tripFormData.arrival}
                    required
                ></Input>
                <Input
                    label="Przyjazd:"   
                    type="datetime-local"
                    name="arrival"
                    value={tripFormData.arrival}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    errors={formError?.arrival ?? null}
                    min={tripFormData.departure}
                    required
                ></Input>
                <Input
                    label="Opis:"   
                    type ="text"
                    name="description"
                    value={tripFormData.description}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-4'
                    classNameInput="w-full"
                    placeholder='opis'
                    errors={formError?.description ?? null}
                    required
                ></Input>
            </div>
        </>
    );
}
