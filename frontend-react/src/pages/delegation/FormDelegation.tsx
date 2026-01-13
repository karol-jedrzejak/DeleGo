
import React from 'react';

import { Input } from '@/components';

// Model //

import type { FormDataType } from '@/models/Delegation';

type FormProps = {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  formError: Partial<Record<keyof FormDataType, string[]>> | null
}

export default function Form({formData,setFormData,formError}:FormProps) {

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
                    label="Wyjazd:"   
                    type = "date"
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
                    type = "date"
                    name="return"
                    value={formData.return}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full" 
                    errors={formError?.return ?? null}
                    required
                ></Input>
            </div>
            <div className='w-full'>
                <Input
                    label="Opis:"   
                    type = "text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "opis"   
                    errors={formError?.description ?? null}
                ></Input>
            </div>
        </>
    );
}
