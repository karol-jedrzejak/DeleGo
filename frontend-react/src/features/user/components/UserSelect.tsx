// Komponenty UI //

import { Select } from '@/components';

// Model //

import type { ItemsType } from "@/models/User";

type Props = {
    items: ItemsType | null;
    value?: number | undefined;
    onChange: (id: string) => void;
    disabled?: boolean;
    noneText?: string;
};

export default function UserSelect({ items, value, onChange, disabled=false, noneText}:Props) {

    return (
        <>
            {items && (
                <Select
                    label="Wybierz usera:"   
                    name="user_id"
                    classNameInput="w-full"
                    disabled={disabled}
                    onChange={e => onChange(e.target.value)}
                    defaultValue={value}
                    >
                    {noneText != "" &&
                        <option>{noneText}</option>
                    }
                    {items?.map( (item_selection,key) => (  
                        <option key={key} value={item_selection.id}
                        >{item_selection.name} {item_selection.surname} [id={item_selection.id}]</option>
                    ))}
                </Select>
            )}
        </>
    );
}
