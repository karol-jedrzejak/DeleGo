
import React from 'react';

import { Input } from '@/components';

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
            <div className='w-full flex-wrap grid grid-cols-2 xl:gap-x-4'>
                <Input
                    label="Marka:"   
                    type = "text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
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
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "model"   
                    errors={formError?.model ?? null}
                    required
                ></Input>
            </div>
            <div className='w-full'>
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
