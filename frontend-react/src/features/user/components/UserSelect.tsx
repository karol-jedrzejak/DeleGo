import React, { useState, useEffect,useRef } from 'react';

// Komponenty UI //

import { Input,Spinner } from '@/components';

// Model //

import type { ItemLookupType  } from "@/models/User";

// API //

import { useBackend } from '@/hooks/useLaravelBackend';
import { userService } from "@/api/services/backend/user/user.service";

type Props = {
    onSelect: (item: ItemLookupType | null ) => void;
    initialValue?: string | null;
    disabled?: boolean;
    onError?: () => void;
};

export default function UserSelect({
    disabled=false,
    initialValue = '',
    onSelect,
    onError 
}:Props) {

    const [query, setQuery] = useState<string>(initialValue ?? '');
    const [results, setResults] = useState<ItemLookupType[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const isTyping = useRef(false);

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemLookupType []>("get", userService.paths.getAll);

    useEffect(() => {
        if (errorGet) {
            onError?.();
        }
    }, [errorGet]);

    useEffect(() => {
        if (!isTyping.current) return;

        if (query.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const timeout = setTimeout(() => {
            const params = new URLSearchParams();
            params.set("search", query);

            mutateGet({ params })
                .then(res => {
                    setResults(res.data);
                    setShowDropdown(true);
                })
                .catch(() => {});
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isTyping.current = true;
        setQuery(e.target.value);
        if(e.target.value == "")
        {
            onSelect(null);
        }
    };

    const handleSelect = (item: ItemLookupType) => {
        setQuery(item.name_surname);
        setResults([]);
        setShowDropdown(false);
        isTyping.current = false;
        onSelect(item);
    };

    if(!errorGet){
        return (
            <div className='relative w-full'>                
                <Input
                    label="Użytkownik:"   
                    type = "text"
                    name="user_id"
                    value={query}
                    disabled={disabled}
                    classNameContainer=''
                    classNameInput='w-full'
                    placeholder = "Wyszukaj"   
                    errors={null}
                    onChange={handleChange}
                ></Input>
                {loadingGet && <div className="absolute z-10 bottom-0 right-0 p-3"><Spinner/></div>}
                {showDropdown && results.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 left-0 text-black">
                    {results.map((item) => (
                        <li 
                        key={item.id} 
                        onClick={() => handleSelect(item)}
                        className="p-2 hover:bg-blue-100 cursor-pointer  rounded-md"
                        >
                        {item.name_surname}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        );
    }
}
