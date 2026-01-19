import React from 'react';

// Components //    
import { Input } from '@/components';

// Model //
import type { FormDataType } from '@/models/DelegationTrip';

type FormProps = {
    delStartDate: string,
    delEndDate: string,
    formData: FormDataType
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formError: Partial<Record<keyof FormDataType, string[]>> | null
}

export default function Form({ delStartDate,delEndDate,formData,setFormData,formError}:FormProps) {

    // -------------------------------------------------------------------------- //
    // Handlery zmian
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
            <div className='w-full grid grid-cols-4 xl:gap-x-4'>
                <Input
                    label="Punkt Startowy:"   
                    type ="text"
                    name="starting_point"
                    value={formData.starting_point}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    placeholder = "miejsce początkowe"
                    disabled={delStartDate && delEndDate ? false : true}
                    errors={formError?.starting_point ?? null}
                    required
                ></Input>
                <Input
                    label="Punkt Końcowy:"   
                    type ="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full" 
                    placeholder = "miejsce końcowe"
                    disabled={delStartDate && delEndDate ? false : true}
                    errors={formError?.destination ?? null}
                    required
                ></Input>
                <Input
                    label="Wyjazd:"   
                    type="datetime-local"
                    name="departure"
                    value={formData.departure}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    disabled={delStartDate && delEndDate ? false : true}
                    min={delStartDate}
                    max={delEndDate}
                    errors={formError?.departure ?? null}
                    required
                ></Input>
                <Input
                    label="Przyjazd:"   
                    type="datetime-local"
                    name="arrival"
                    value={formData.arrival}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    disabled={delStartDate && delEndDate ? false : true} 
                    min={delStartDate}
                    max={delEndDate}
                    errors={formError?.arrival ?? null}
                    required
                ></Input>
                <Input
                    label="Opis:"   
                    type ="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-3'
                    classNameInput="w-full"
                    placeholder='opis'
                    disabled={delStartDate && delEndDate ? false : true}
                    errors={formError?.description ?? null}
                    required
                ></Input>
                <Input
                    label="Dystans:"   
                    type ="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-1'
                    classNameInput="w-full" 
                    unit={"km"}
                    disabled={delStartDate && delEndDate ? false : true}
                    errors={formError?.distance ?? null}
                    required
                ></Input>
            </div>
        </>
    );
}
