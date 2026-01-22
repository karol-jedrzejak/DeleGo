import React, { useState } from 'react';

// Komponenty UI //

import { SquarePlus,Undo2 } from "lucide-react";
import { Button} from '@/components';

// Model //
import { DEFAULT_FORM_DATA } from '@/models/DelegationTrip';
import type { FormDataType } from '@/models/DelegationTrip.tsx';
import Form from './Form.tsx';
import { validate } from './Form.tsx';
import { useDelegationForm } from '../Form.tsx';

type FormProps = {
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Create({setPopUp}:FormProps) {

    const { formData, setFormData,tripTypes } = useDelegationForm();
    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //
 
    const [tripFormData, setTripFormData] = useState<FormDataType>(DEFAULT_FORM_DATA);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormDataType, string[]>> | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Submit Handler
    // -------------------------------------------------------------------------- //

    const handleSubmit = async () => {
        if(validate({formData,tripFormData,setFormErrors,tripTypes}))
        {
            // Add trip to delegation
            setFormData((p) => ({ ...p, delegation_trips: [...p.delegation_trips, tripFormData] }));

            // Close pop-up
            setPopUp(false);
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
