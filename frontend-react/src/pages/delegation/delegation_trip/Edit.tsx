import React, { useState } from 'react';

// Komponenty UI //

import { SquarePen,Undo2 } from "lucide-react";
import { Button} from '@/components';

// Model //
import type { FormDataType } from '@/models/DelegationTrip.tsx';
import Form from './Form.tsx';
import { validate } from './Form.tsx';
import { useDelegationForm } from '../Form.tsx';

type FormProps = {
    id: number
    setPopUp: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Edit({id,setPopUp}:FormProps) {

    const { formData, setFormData,delegationOptions } = useDelegationForm();
    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //
 
    const [tripFormData, setTripFormData] = useState<FormDataType>(formData.delegation_trips[id]);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormDataType, string[]>> | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const handleSubmit = async () => {
        let tripTypes = delegationOptions.tripTypes;
        if(validate({formData,tripFormData,setFormErrors,tripTypes,id}))
        {
            // Update trip
            setFormData(prev => {
                const trips = [...prev.delegation_trips]; // kopia
                trips[id] = tripFormData;                 // ZASTĄPIENIE

                return {
                ...prev,
                delegation_trips: trips,
                };
            });
            
            // Close pop-up
            setPopUp(undefined);
        }
    };
    
    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <div className='w-full'>
            <Form tripFormData={tripFormData} setTripFormData={setTripFormData} formError={formErrors}/>
            <div className='w-full flex justify-end items-center pt-4 gap-2'>
                <Button
                    className='flex items-center'
                    color="yellow"
                    onClick={() => {handleSubmit()}}
                >
                    <SquarePen size={24} className="pe-1"/>
                    Zaktualizuj
                </Button>
                <Button
                    className='flex items-center'
                    color="sky"
                    onClick={() => {setPopUp(undefined)}}
                >
                    <Undo2 size={24} className="pe-1"/>
                    Anuluj
                </Button>
            </div>
        </div>
    );
}
