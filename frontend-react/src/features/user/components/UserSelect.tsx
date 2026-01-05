import React, { useState, useEffect,useRef } from 'react';

// Komponenty UI //

import { Input,Spinner } from '@/components';

// Model //

import type { ItemLookupType  } from "@/models/User";

// API //

import { useBackend } from '@/hooks/useLaravelBackend';
import { userService } from "@/api/services/backend/user/user.service";

type Props = {
    onSelect: (item: ItemLookupType ) => void;
    initialValue?: string | null;
    disabled?: boolean;
};

export default function UserSelect({
    disabled=false,
    initialValue = '',
    onSelect,
}:Props) {

    const [query, setQuery] = useState<string>(initialValue ?? '');
    const [results, setResults] = useState<ItemLookupType[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

/*     const [isSelecting, setIsSelecting] = useState(false);
    const isFirstRender = useRef<boolean>(true); */

    const isTyping = useRef(false);

    const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemLookupType []>("get", userService.paths.getAll);

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
    };

    const handleSelect = (item: ItemLookupType) => {
        setQuery(item.name_surname);
        setResults([]);
        setShowDropdown(false);
        isTyping.current = false;
        onSelect(item);
    };


    /* 
    useEffect(() => {
        
        if(query == initialValue)
        {
            return;
        }

        if (isSelecting) {
            setIsSelecting(false);
            return;
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams();
            params.set("search", query);
            mutateGet({params: params})
            .then((res) => {
                setResults(res.data);
                setShowDropdown(true);
            })
            .catch(() => {});
        }, 500);

        return () => {clearTimeout(timeoutId);};
    }, [query]);

    // Obsługa kliknięcia z poprawnym typowaniem
    const handleSelect = (item: ItemLookupType ) => {
        setIsSelecting(true);
        setQuery(item.name_surname);
        setResults([]);
        setShowDropdown(false);
        onSelect(item);
    }; */

    if(errorGet){
        return <>Błąd</>
    } else {
        return (
            <div className='relative w-full'>                
                <Input
                    label="Użytkownik:"   
                    type = "text"
                    name="user_id"
                    value={query}
                    disabled={disabled}
                    //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    classNameContainer=''
                    classNameInput='w-full'
                    placeholder = "Wyszukaj"   
                    errors={null}
                    onChange={handleChange}
                    //onFocus={() => query.length >= 2 && setShowDropdown(true)}
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
