
import React from "react";
import { useState } from "react";

type Search = {
    search: string | null,
    searchBy: {
            name: string
            value:string
    }[]  | null, 
};

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<Search>>,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    search: Search,
    variable_name: string,
    text?: string,
    nosort?: boolean
};

function HeaderSearch({ search, setSearch, setPage, variable_name, text = "Wyszukaj", nosort=false }: Props) {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(value);

        if(search.searchBy != null)
        {
            let foundIndex = search.searchBy.findIndex(item => item.name == name);
            if(foundIndex != -1){

                const new_search: Search = {...search};
                if(value != "")
                {
                    new_search.searchBy![foundIndex] = { name:name, value:value };
                    new_search.search = null;
                    setSearch(new_search);
                } else {
                    new_search.searchBy = new_search.searchBy!.filter((_, index) => index !== foundIndex);
                    new_search.search = null;
                    setSearch(new_search);
                }

            } else {
                if(value != "")
                {
                    const new_search: Search = {
                        search: null,
                        searchBy: [...search.searchBy, { name:name, value:value }]
                    };
                    setSearch(new_search);
                }
            }
        } else{
            if(value == "")
            {
                setSearch({search: null, searchBy: null})
            } else {
                setSearch({search: null, searchBy: [{name:name, value: value}]})
            }
        }
        // Ustaw Page 1 
        setPage("?page=1");
    };

    return (
        <th>
            <div className="flex flex-row p-2 mb-2">
                <div className={nosort==true ? `flex-1` : `flex-1 me-2`}>
                    <input
                            name={variable_name}
                            type="text"
                            value={search.search ? "" : value}
                            onChange={handleChange}
                            placeholder={text}
                            disabled={search.search !== null}
                            className={
                                `font-normal w-full px-3 py-2 border rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 `
                                +( search.search ?
                                    `text-gray-500 dark:text-gray-500 border-gray-400 dark:border-gray-200 bg-neutral-300` :
                                    'text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-200 bg-white')
                            }
                        />
                </div>
                <div className={nosort==true ? `w-2` : `w-3`}></div>
            </div>
        </th>
    )
}

export default HeaderSearch
