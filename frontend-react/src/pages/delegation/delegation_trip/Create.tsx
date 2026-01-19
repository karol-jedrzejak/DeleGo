import React, { useState } from 'react';

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Button} from '@/components';

// Model //

import type { FormDataType as DelegationFormDataType } from '@/models/Delegation.tsx';

import { hasDateBetween,hasTripOverlap,DEFAULT_FORM_DATA } from '@/models/DelegationTrip';
import type { FormDataType } from '@/models/DelegationTrip.tsx';
import Form from './Form.tsx';


type FormProps = {
    delegationData: DelegationFormDataType
    setDelegationData: React.Dispatch<React.SetStateAction<DelegationFormDataType>>
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Create({delegationData,setDelegationData,setPopUp}:FormProps) {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //
 
    const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormDataType, string[]>> | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const handleSubmit = async () => {
        let arrival_array: string[] = [];
        let departure_array: string[] = [];

        // Validate overlap with main dates
        if (!hasDateBetween(formData.arrival,delegationData.departure,delegationData.return)) {
           arrival_array.push("Data przyjazdu poza zakresem delegacji.");
        }
        if (!hasDateBetween(formData.departure,delegationData.departure,delegationData.return)) {
           departure_array.push("Data wyjazdu poza zakresem delegacji.");
        }

        // Validate overlap with other trip dates
        if (hasTripOverlap(formData, delegationData.delegation_trips)) {
            arrival_array.push("Daty pokrywają się z inna datą.");
            departure_array.push("Daty pokrywają się z inna datą.");
        }

        // Valide description length
        if(formData.description.length < 3)
        {
            setFormErrors((p) => ({ ...p, description: ['Opis musi mieć co najmniej 3 znaki'] }));
        }

        // Valide starting_point length
        if(formData.starting_point.length < 3)
        {
            setFormErrors((p) => ({ ...p, starting_point: ['Punkt wyjazdu musi mieć co najmniej 3 znaki'] }));
        }

        // Valide destination point length
        if(formData.destination.length < 3)
        {
            setFormErrors((p) => ({ ...p, destination: ['Punkt docelowy musi mieć co najmniej 3 znaki'] }));
        }

        if(arrival_array.length > 0 || departure_array.length > 0)
        {
            setFormErrors((p) => ({ ...p, arrival: arrival_array, departure: departure_array }));
            return;
        }

        // Clear errors
        setFormErrors(null);

        // Add trip to delegation
        setDelegationData((p) => ({ ...p, delegation_trips: [...p.delegation_trips, formData] }));

        // Close pop-up
        setPopUp(false);

    };

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <div className='w-full'>
            <Form delStartDate={delegationData.departure} delEndDate={delegationData.return} formData={formData} setFormData={setFormData} formError={formErrors}/>
            <div className='w-full flex justify-end items-center pt-4 gap-2'>
                <Button
                    className='flex items-center'
                    color="green"
                    onClick={() => {handleSubmit()}}
                >
                    <SquarePlus size={24} className="pe-1"/>
                    Dodaj
                </Button>
                <Button
                    className='flex items-center'
                    color="sky"
                    onClick={() => {setPopUp(false)}}
                >
                    <Undo2 size={24} className="pe-1"/>
                    Anuluj
                </Button>
            </div>
        </div>
    );
}
