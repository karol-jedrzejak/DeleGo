
import React from 'react';

import { Input, Select, Line } from '@/components';

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
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="(opcja):"   
                    type = "text"
                    name="academic_titles_before"
                    value={formData.academic_titles_before ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/3 xl:w-1/8 pe-2'
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
                    classNameContainer='w-2/3 xl:w-3/8 ps-2 xl:px-2'
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
                    classNameContainer='w-2/3 xl:w-3/8 pe-2 xl:px-2'
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
                    classNameContainer='w-1/3 xl:w-1/8 ps-2'
                    classNameInput="w-full"
                    placeholder = "np (IWE)"   
                    errors={formError?.academic_titles_after ?? null}
                ></Input>
            </div>
            <div className='flex flex-row w-full'>
                <Input
                    label="Stanowisko (opcja):"   
                    type = "text"
                    name="position"
                    value={formData.position ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
                    classNameInput="w-full"
                    placeholder = "stanowisko"   
                    errors={formError?.position ?? null}
                ></Input>
                <Select
                    label="Aktywna:"   
                    name="active"
                    onChange={handleChange}
                    classNameContainer='w-1/2 ps-2'
                    classNameInput='w-full'
                    defaultValue={formData.active ? "1" : "0"}   
                    errors={formError?.active ?? null}>
                        <option value="1">Tak</option>
                        <option value="0">Nie</option>
                </Select>
            </div>
            <Line text="Dane Kontaktowe (Opcjonalne)"/>
            <div className='flex flex-row w-full'>
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
            <div className='flex flex-row w-full'>
                <Input
                    label="Telefon Komórkowy:"   
                    type = "text"
                    name="phone_mobile"
                    value={formData.phone_mobile ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
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
                    classNameContainer='w-1/2 ps-2'
                    classNameInput="w-full"
                    placeholder = "numer telefonu"   
                    errors={formError?.phone_landline ?? null}
                ></Input>
            </div>
            <Line text="Dane osobowe (Opcjonalne)"/>
            <div className='flex flex-row w-full'>
                <Input
                    label="Pesel:"   
                    type = "text"
                    name="pesel"
                    value={formData.pesel ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/3 pe-2'
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
                    classNameContainer='w-1/3 px-2'
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
                    classNameContainer='w-1/3 ps-2'
                    classNameInput="w-full"
                    placeholder = "miejsce urodzenia"   
                    errors={formError?.birth_place ?? null}
                ></Input>
            </div>
            <div className='flex flex-row w-full'>
                <Input
                    label="Nr paszportu:"   
                    type = "text"
                    name="passport"
                    value={formData.passport ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
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
                    classNameContainer='w-1/2 ps-2'
                    classNameInput="w-full"
                    placeholder = "nr dowodu osobistego"   
                    errors={formError?.id_card ?? null}
                ></Input>
            </div>
        </>
    );
}
