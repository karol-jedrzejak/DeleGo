import React, { useContext,useState } from 'react';
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
    const [isCompany, setIsCompany] = useState<boolean>(true);

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
            <div className='w-full grid grid-cols-3 xl:gap-x-4'>
                <CarSelect
                    className='col-span-3 xl:col-span-2'
                    onSelect={handleCarChange}
                    initialValue={itemData?.car}
                    user_id={formData.user_id}/>
                <Input
                    label="Przejechanych km (auto służbowe):"   
                    type = "number"
                    name="total_distance"
                    value={formData.total_distance ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-3 xl:col-span-1'
                    classNameInput="w-full"
                    placeholder = "dystans w km"   
                    errors={formError?.total_distance ?? null}
                    unit="km"
                    step="1"
                    min="1"
                    max="9999"
                ></Input>
            </div>
            <div className='w-full xl:flex xl:flex-row xl:items-end'>
                <label className="inline-flex items-center cursor-pointer p-4">
                    <span className="select-none text-sm font-medium text-heading">Firma</span>
                    <input type="checkbox" value="" className="sr-only peer" onChange={() => {setIsCompany(!isCompany)}}/>
                    <div className="relative mx-3 w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                    <span className="select-none text-sm font-medium text-heading">Address</span>
                </label>
                {isCompany ? (
                    <CompanySelect
                        className='flex-1'
                        onSelect={handleCompanyChange}
                        initialValue={itemData?.company}
                        disabled={formData.custom_address ? true : false}
                />):(
                    <Input
                        label="Adres:"   
                        type = "text"
                        name="custom_address"
                        value={formData.custom_address ?? ""}
                        onChange={handleChange}
                        classNameContainer='flex-1'
                        classNameInput="w-full"
                        placeholder = "adres"   
                        disabled={formData.company_id ? true : false}
                        errors={formError?.custom_address ?? null}
                    ></Input>
                )}

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
            <div className='w-full xl:flex xl:flex-row xl:gap-x-4'>
                <Input
                    label="Opis:"   
                    type = "text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    classNameContainer='w-full xl:flex-1'
                    classNameInput="w-full"
                    placeholder = "opis"   
                    errors={formError?.description ?? null}
                ></Input>
                <Select
                    label="Rozliczona:"   
                    name="settled"
                    value={formData.settled ? "1" : "0"}
                    onChange={handleChange}
                    classNameContainer='w-full xl:w-40'
                    classNameInput="w-full" 
                    errors={formError?.settled ?? null}
                >
                    <option value="0">Nie</option>
                    <option value="1">Tak</option>
                </Select>
            </div>

            {/* delegation_bills */}
            {/* delegation_trips */}
        </>
    );
}
