import React, { useState } from "react";

type Search = {
    search: string | null;
    searchBy: {
        name: string;
        value: string;
    }[] | null;
};

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<Search>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    search: Search;
    variable_names: string[]; // kolumny, w których chcemy szukać
    placeholder?: string;
    nosort?: boolean;
};

function HeaderSearchArray({ search, setSearch, setPage, variable_names, placeholder = "Wyszukaj", nosort = false }: Props) {
    const [value, setValue] = useState<string>("");

    const handleChange = (val: string) => {
        setValue(val);

        let new_search: Search = { search: null, searchBy: null };

        if (val !== "") {
            new_search.searchBy = variable_names.map(field => ({ name: field, value: val }));
        }

        setSearch(new_search);
        setPage("?page=1");
    };

    return (
        <th>
            <div className="flex flex-row p-2 mb-2">
                <div className={nosort ? `flex-1` : `flex-1 me-2`}>
                    <input
                        type="text"
                        value={value}
                        onChange={e => handleChange(e.target.value)}
                        placeholder={placeholder}
                        className="font-normal w-full px-3 py-2 border rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 text-gray-900 border-gray-400 bg-white"
                    />
                </div>
            </div>
        </th>
    );
}

export default HeaderSearchArray;
