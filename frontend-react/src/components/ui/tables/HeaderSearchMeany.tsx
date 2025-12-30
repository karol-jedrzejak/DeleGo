
import React from "react";
import { useState } from "react";

type Search = {
    search: string | null,
    searchBy: {
            name: string
            value:string
    }[]  |null, 
};

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<Search>>,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    search: Search,
};

function HeaderSearchMeany({ search, setSearch, setPage }: Props) {

    const [searchMeany, setSearchMeany] = useState<string>("");

    const handleSearchMeany = (e: React.ChangeEvent<HTMLInputElement>) => {
            const new_search: Search = {...search};
            const {value} = e.target;
            if(value == "")
            {
                new_search.search = null;
                setSearch(new_search)
            } else {
                new_search.search = value;
                setSearch(new_search)
            }
            setSearchMeany(value);
            // Ustaw Page 1 
            setPage("?page=1");
        };

    return (
        <>
        <input
            name="search"
            type="text"
            value={search.searchBy && search.searchBy.length > 0 ? "" : searchMeany}
            disabled={search.searchBy !== null && search.searchBy.length > 0}
            onChange={handleSearchMeany}
            placeholder="Wyszukaj"
            className={
                `font-normal w-48 px-3 py-2 border rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 `
                +( search.searchBy !== null && search.searchBy.length > 0?
                    `text-gray-500 dark:text-gray-500 border-gray-400 dark:border-gray-200 bg-neutral-300` :
                    'text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-200 bg-white')
            }
        />
        </>
    )
}

export default HeaderSearchMeany
