import React, { useContext } from 'react';
import { AuthContext } from "@/providers/AuthProvider.js";

import { Input,Select } from '@/components';

// Model //

import type { ItemFullType,FormDataType } from '@/models/Delegation';

import UserSelect from '@/features/user/components/UserSelect.tsx';
import CarSelect from '@/features/user/components/CarSelect.tsx';
import CompanySelect from '@/features/company/components/CompanySelect.tsx';


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
    // Change user (For Admin)
    // -------------------------------------------------------------------------- //

    const handleUserChange = (user_id: number | null ) => {
        setFormData((p) => ({ ...p, user_id: user_id ?? null, car_id: null}));
    };

    // -------------------------------------------------------------------------- //
    // Change Car
    // -------------------------------------------------------------------------- //

    const handleCarChange = (car_id: number | null ) => {
        setFormData((p) => ({ ...p, car_id: car_id ?? null}));
    };
    // -------------------------------------------------------------------------- //
    // Change Car
    // -------------------------------------------------------------------------- //

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
            <div className='w-full'>
                <CarSelect onSelect={handleCarChange} initialValue={itemData?.car} user_id={formData.user_id}/>
            </div>
            <div className='w-full'>
                <CompanySelect onSelect={handleCompanyChange} initialValue={itemData?.company}/>
            </div>
            <div className='w-full'>
                <Input
                    label="Adres:"   
                    type = "text"
                    name="custom_address"
                    value={formData.custom_address ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "adres"   
                    errors={formError?.custom_address ?? null}
                ></Input>
            </div>

            <div className='w-full'>
                <Input
                    label="Odległość:"   
                    type = "number"
                    name="total_distance"
                    value={formData.total_distance ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full"
                    placeholder = "dystans w km"   
                    errors={formError?.total_distance ?? null}
                    unit="km"
                    step="1"
                    min="1"
                    max="9999"
                ></Input>
            </div>

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
            <div className='w-full'>
                <Select
                    label="Rozliczona:"   
                    name="settled"
                    value={formData.settled.toString()}
                    onChange={handleChange}
                    classNameContainer='w-full'
                    classNameInput="w-full" 
                    errors={formError?.settled ?? null}
                >
                    <option value="1">Tak</option>
                    <option value="0">Nie</option>
                </Select>
            </div>

            {/* delegation_bills */}
            {/* delegation_trips */}
        </>
    );
}
