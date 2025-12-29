
import React from 'react';

import { Input, Line } from '@/components';

import type { FormPropsType } from '@/models/Employee.tsx';

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
            <div className='w-full flex-wrap grid grid-cols-8 sm:gap-x-2 xl:gap-x-4'>
                <Input
                    label="(opcja):"   
                    type = "text"
                    name="academic_titles_before"
                    value={formData.academic_titles_before ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-8 sm:col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "np. mgr inż"   
                    errors={formError?.academic_titles_before ?? null}
                ></Input>
                <Input
                    label="Imię:"   
                    type = "text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    classNameContainer='col-span-8 sm:col-span-6 xl:col-span-3'
                    classNameInput="w-full"
                    placeholder = "imię"   
                    errors={formError?.name ?? null}
                    required
                ></Input>
                <Input
                    label="Nazwisko:"   
                    type = "text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    classNameContainer='col-span-8 sm:col-span-6 xl:col-span-3'
                    classNameInput="w-full"
                    placeholder = "nazwisko"   
                    errors={formError?.surname ?? null}
                    required
                ></Input>
                <Input
                    label="(opcja):"   
                    type = "text"
                    name="academic_titles_after"
                    value={formData.academic_titles_after ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-8 sm:col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "np (IWE)"   
                    errors={formError?.academic_titles_after ?? null}
                ></Input>
            </div>
            <div className='w-full'>
                <Input
                    label="Stanowisko (opcja):"   
                    type = "text"
                    name="position"
                    value={formData.position ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "stanowisko"   
                    errors={formError?.position ?? null}
                ></Input>
            </div>
            <Line text="Dane Kontaktowe (Opcjonalne)"/>
            <div className='w-full'>
                <Input
                    label="E-mail:"   
                    type = "text"
                    name="email"
                    value={formData.email ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "e-mail"   
                    errors={formError?.email ?? null}
                ></Input>
            </div>
            <div className='w-full flex-wrap grid grid-cols-2 xl:gap-x-4'>
                <Input
                    label="Telefon Komórkowy:"   
                    type = "text"
                    name="phone_mobile"
                    value={formData.phone_mobile ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "numer telefonu"   
                    errors={formError?.phone_mobile ?? null}
                ></Input>
                <Input
                    label="Telefon Stacjonarny:"   
                    type = "text"
                    name="phone_landline"
                    value={formData.phone_landline ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "numer telefonu"   
                    errors={formError?.phone_landline ?? null}
                ></Input>
            </div>
            <Line text="Dane osobowe (Opcjonalne)"/>
            <div className='w-full flex-wrap grid grid-cols-3 xl:gap-x-4'>
                <Input
                    label="Pesel:"   
                    type = "text"
                    name="pesel"
                    value={formData.pesel ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-3 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "pesel"   
                    errors={formError?.pesel ?? null}
                ></Input>
                <Input
                    label="Data Urodzenia:"   
                    type = "date"
                    name="birth_date"
                    value={formData.birth_date ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-3 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "data urodzenia"   
                    errors={formError?.birth_date ?? null}
                ></Input>
                <Input
                    label="Miejsce Urodzenia:"   
                    type = "text"
                    name="birth_place"
                    value={formData.birth_place ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-3 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "miejsce urodzenia"   
                    errors={formError?.birth_place ?? null}
                ></Input>
            </div>
            <div className='w-full flex-wrap grid grid-cols-2 xl:gap-x-4'>
                <Input
                    label="Nr paszportu:"   
                    type = "text"
                    name="passport"
                    value={formData.passport ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "nr paszportu"   
                    errors={formError?.passport ?? null}
                ></Input>
                <Input
                    label="Nr dowodu osobistego:"   
                    type = "text"
                    name="id_card"
                    value={formData.id_card ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-2 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "nr dowodu osobistego"   
                    errors={formError?.id_card ?? null}
                ></Input>
            </div>
        </>
    );
}
