import React, { useState, useEffect,useRef } from 'react';

// Komponenty UI //

import { Input,Spinner } from '@/components';

// Model //

import type { ItemLookupType  } from "@/models/Car";

// API //

import { useBackend, mapErrorToInputErrors } from '@/hooks/useLaravelBackend';
import { carService } from "@/api/services/backend/user/car.service";

type Props = {
    onSelect: (item: number | null, label: string | null) => void;
    initialValue?: string | null;
    user_id: number | null;
    errors?: string[] | null,
    disabled?: boolean;
    className?: string;
};

export default function CarSelect({
    disabled=false,
    initialValue = null,
    errors = null,
    user_id,
    onSelect,
    className,
}:Props) {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const [query, setQuery] = useState<string>(initialValue ? initialValue : "");
    const [results, setResults] = useState<ItemLookupType[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const isTyping = useRef(false);

    const { loading:loadingGetSearch, error:errorGetSearch, mutate:mutateGetSearch } = useBackend<ItemLookupType []>("get", carService.paths.getOptions);
    
    // -------------------------------------------------------------------------- //
    // Use Effects
    // -------------------------------------------------------------------------- //

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
            params.set("user_id", user_id?.toString() ?? "");
            mutateGetSearch({ params })
                .then(res => {
                    setResults(res.data);
                    setShowDropdown(true);
                })
                .catch(() => {});
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    // -------------------------------------------------------------------------- //
    // Change Handlers
    // -------------------------------------------------------------------------- //

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isTyping.current = true;
        setQuery(e.target.value);
        if(e.target.value == "")
        {
            onSelect(null,null);
        }
    };

    const handleSelect = (item: ItemLookupType) => {
        setQuery(item.name);
        setResults([]);
        setShowDropdown(false);
        isTyping.current = false;
        onSelect(item.id, item.name);
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie
    // -------------------------------------------------------------------------- //

    return (
        <div className={`relative w-full ${className ?? ''}`}>                
            <Input
                label="Auto:"   
                type = "text"
                name="car_id"
                value={query}
                disabled={disabled} 
                classNameContainer=''
                classNameInput='w-full'
                placeholder = "wyszukaj"   
                errors={mapErrorToInputErrors(errorGetSearch)}
                onChange={handleChange}
            ></Input>
            {loadingGetSearch && <div className="absolute z-10 top-10 right-0 p-3"><Spinner/></div>}
            {showDropdown && results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 left-0 text-black">
                {results.map((item) => (
                    <li 
                    key={item.id} 
                    onClick={() => handleSelect(item)}
                    className="p-2 hover:bg-blue-100 cursor-pointer  rounded-md"
                    >
                    {item.name}
                    </li>
                ))}
                </ul>
            )}
            {errors && <div className="text-red-600 my-2 text-center text-sm">
                {errors.map( (error,key) => (
                                <span key={key}>{error} </span>
                            ))}
                </div>}
        </div>
    );

}
