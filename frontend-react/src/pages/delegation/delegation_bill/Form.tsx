import React from 'react';

// Components //    
import { Input,Select } from '@/components';

// Model //

import type { FormDataType } from '@/models/DelegationBill';
import { useDelegationForm } from '../Form.tsx';


type FormErrors =  Partial<Record<keyof FormDataType, string[]>> | null;


// -------------------------------------------------------------------------- //
// Validation
// -------------------------------------------------------------------------- //

type ValidationProps = {
    billFormData: FormDataType
    setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
    id?:number
}

export const validate = ({billFormData,setFormErrors}:ValidationProps) => {

    setFormErrors(null);
    let error = false;

    if(!billFormData.amount)
    {
        error=true;
        setFormErrors((p) => ({ ...p, amount: ['Uzupełnij kwotę.'] }));
    }

    return !error;
};

// -------------------------------------------------------------------------- //
// Form
// -------------------------------------------------------------------------- //

type FormProps = {
    billFormData: FormDataType
    setBillFormData: React.Dispatch<React.SetStateAction<FormDataType>>
    formError: FormErrors
}

export default function Form({ billFormData,setBillFormData,formError}:FormProps) {

    const { billTypes, currencyTypes } = useDelegationForm();

    // -------------------------------------------------------------------------- //
    // Handlery zmian
    // -------------------------------------------------------------------------- //

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setBillFormData((p) => ({ ...p, [name]: value }));
    };

    // -------------------------------------------------------------------------- //
    // Select Handlers
    // -------------------------------------------------------------------------- //

    const handleBillTypeChange = (bill_type_id: string) => {
        setBillFormData((p) => ({ ...p, delegation_bill_type_id: Number(bill_type_id)}));
    };

    const handleCurrencyTypeChange = (currency_code: string) => {
        setBillFormData((p) => ({ ...p, currency_code: currency_code}));
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='w-full grid grid-cols-4 xl:gap-x-4'>
                <Select
                name="delegation_bill_type_id"
                label="Rodzaj Rachunku:"
                classNameContainer='col-span-4 xl:col-span-4'
                classNameInput='w-full'
                defaultValue={billFormData.delegation_bill_type_id}
                onChange={(e) => handleBillTypeChange(e.target.value)}
                >
                    {billTypes.map( (bill_type,key) => (
                        <option key={key} value={bill_type.id}>{bill_type.name}</option>
                    ))}
                </Select>

                <Input
                    label="Kwota:"   
                    type ="number"
                    name="amount"
                    value={billFormData.amount}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-2'
                    classNameInput="w-full"
                    placeholder = "kwota"
                    errors={formError?.amount ?? null}
                    required
                ></Input>
                <Select
                name="currency_code"
                label="Waluta:"
                classNameContainer='col-span-4 xl:col-span-2'
                classNameInput='w-full'
                defaultValue={billFormData.currency_code}
                onChange={(e) => handleCurrencyTypeChange(e.target.value)}
                >
                    {currencyTypes.map( (currency_type,key) => (
                        <option key={key} value={currency_type.code}>{currency_type.name} {currency_type.code} {currency_type.symbol}</option>
                    ))}
                </Select>
                <Input
                    label="Opis:"   
                    type ="text"
                    name="description"
                    value={billFormData.description}
                    onChange={handleChange}
                    classNameContainer='col-span-4 xl:col-span-4'
                    classNameInput="w-full"
                    placeholder='opis'
                    errors={formError?.description ?? null}
                    required
                ></Input>
            </div>
        </>
    );
}
