
import React, { useEffect, useState  } from 'react';

// Komponenty UI //

import { Input, Spinner } from '@/components';
import { Error as ErrorComponent } from '@/components';

// Model //

import type { ItemFullType,FormDataType,CreateOptions } from '@/models/Car.tsx';

// USERS //

import UserSelect from '@/features/user/components/UserSelect.tsx';
import { carService } from '@/api/services/backend/user/car.service';
import { useBackend } from '@/hooks/useLaravelBackend.ts';

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

    const [carOptions, setCarOptions] = useState<CreateOptions>({
        permissions: {
            can_select_user: false,
        }
    });

    // -------------------------------------------------------------------------- //
    // Pobranie opcji do formularza
    // -------------------------------------------------------------------------- //

    const { loading:loadingOptionsGet, error:errorOptionsGet, mutate:mutateOptionsGet } = useBackend<CreateOptions>("get", carService.paths.getCreateOptions,{ initialLoading: true });

    useEffect(() => {
        mutateOptionsGet()
        .then((res) => {
           setCarOptions(res.data);
        })
        .catch(() => {});
    }, []);

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

    const handleUserChange = (user_id: number | null  ) => {
        setFormData((p) => ({ ...p, user_id: user_id ?? null}));
    };

    if(loadingOptionsGet){
        return <Spinner/>;
    }

    if(errorOptionsGet){
        return <ErrorComponent><ErrorComponent.Text type={"standard"}>Błąd serwera</ErrorComponent.Text></ErrorComponent>;
    }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='w-full'>
            {carOptions.permissions.can_select_user && (
                <UserSelect
                    onSelect={handleUserChange}
                    initialValue={itemData ? itemData?.user?.names.name+" "+itemData?.user?.names.surname : ""}
                />
            )}
            </div>
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
