// Komponenty UI //

import { Select } from '@/components';

// Model //

import type { ItemsType } from "@/models/User";

type Props = {
    loading: boolean,
    items: ItemsType | null;
    value?: number | undefined;
    onChange: (id: string) => void;
    disabled?: boolean;
    noneText?: string;
};

export default function UserSelect({ items, value, onChange, loading, disabled=false, noneText}:Props) {

    return (
        <>
            {(!loading && items) ? (
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
            ):(
                <div className="w-full flex items-center justify-center p-4">
                    <div className='pe-2 text-(--app_color) font-semibold'>ŁADOWANIE UŻYTKOWNIKÓW</div><div className="loader w-10 h-10 border-[5px] border-(--app_color) dark:border-(--app_color)"></div>
                </div>
            )}
        </>
    );
}
