
import React from 'react';

import { Input, Select } from '@/components';

import type { FormPropsType } from '@/models/Car.tsx';

export default function Form({formData,setFormData,formError}:FormPropsType) {

    // -------------------------------------------------------------------------- //
    // Change Handler
    // -------------------------------------------------------------------------- //

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Marka:"   
                    type = "text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    classNameContainer='w-full xl:w-1/2 xl:pe-2'
                    classNameInput="w-full"
                    placeholder = "marka"   
                    errors={formError?.brand ?? null}
                    required
                ></Input>
                <Input
                    label="Model:"   
                    type = "text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    classNameContainer='w-full xl:w-1/2 xl:ps-2'
                    classNameInput="w-full"
                    placeholder = "model"   
                    errors={formError?.model ?? null}
                    required
                ></Input>
            </div>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Numer rejestracyjny:"   
                    type = "text"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "numer rejestracyjny"   
                    errors={formError?.registration_number ?? null}
                ></Input>
            </div>
        </>
    );
}
