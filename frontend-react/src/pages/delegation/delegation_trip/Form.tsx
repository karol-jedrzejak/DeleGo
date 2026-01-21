import React from 'react';

// Components //    
import { Input } from '@/components';

// Model //
import type { FormDataType } from '@/models/DelegationTrip';
import type { FormDataType as DelegationDataType } from '@/models/Delegation';

import CarSelect from '@/features/user/components/CarSelect.tsx';

type FormProps = {
    delegationData: DelegationDataType,
    formData: FormDataType
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formError: Partial<Record<keyof FormDataType, string[]>> | null
}

export default function Form({ delegationData,formData,setFormData,formError}:FormProps) {

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
    // Select Handlers
    // -------------------------------------------------------------------------- //

    const handleCarChange = (car_id: number | null ) => {
        setFormData((p) => ({ ...p, car_id: car_id ?? null}));
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div>
                <Input
                    label="Tranport opis:"   
                    type ="text"
                    name="custom_transport"
                    value={formData.custom_transport ?? ""}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    placeholder = "transport - opis własny"
                    errors={formError?.custom_transport ?? null}
                    required
                ></Input>
            </div>
            <div className='w-full grid grid-cols-3 xl:gap-x-4'>
                <CarSelect
                    className='col-span-3 xl:col-span-2'
                    onSelect={handleCarChange}
                    //initialValue={formData.car_id}
                    user_id={delegationData.user_id}/>
            </div>
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
                    errors={formError?.distance ?? null}
                    required
                ></Input>
            </div>
        </>
    );
}
