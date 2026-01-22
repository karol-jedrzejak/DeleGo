import React, { useState, useEffect,useRef } from 'react';

// Komponenty UI //

import { Input,Spinner } from '@/components';

// Model //

import type { ItemNamesOnlyType   } from "@/models/Company";

// API //

import { useBackend, mapErrorToInputErrors } from '@/hooks/useLaravelBackend';
import { companyService } from "@/api/services/backend/company/company.service";

type Props = {
    onSelect: (item: number | null ) => void;
    initialValue?: string | null;
    disabled?: boolean;
    className?: string;
};

export default function CompanySelect({
    disabled=false,
    initialValue = null,
    onSelect,
    className
}:Props) {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const [query, setQuery] = useState<string>(initialValue ? initialValue : "");
    const [results, setResults] = useState<ItemNamesOnlyType[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const isTyping = useRef(false);

    const { loading:loadingGetSearch, error:errorGetSearch, mutate:mutateGetSearch } = useBackend<ItemNamesOnlyType []>("get", companyService.paths.getOptions);
    
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
            onSelect(null);
        }
    };

    const handleSelect = (item: ItemNamesOnlyType) => {
        setQuery(item.name);
        setResults([]);
        setShowDropdown(false);
        isTyping.current = false;
        onSelect(item.id);
    };

    // -------------------------------------------------------------------------- //
    // Renderowanie
    // -------------------------------------------------------------------------- //

    return (
        <div className={`relative w-full ${className ?? ''}`}>                  
            <Input
                label="Firma:"   
                type = "text"
                name="company_id"
                value={query}
                disabled={disabled} 
                classNameContainer=''
                classNameInput='w-full'
                placeholder = "wyszukaj"   
                errors={mapErrorToInputErrors(errorGetSearch)}
                onChange={handleChange}
            ></Input>
            {loadingGetSearch && <div className="absolute z-10 bottom-0 right-0 p-3"><Spinner/></div>}
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
        </div>
    );

}
