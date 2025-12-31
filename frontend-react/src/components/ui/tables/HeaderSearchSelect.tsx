
import React from "react";
import { Select } from "@/components/index";
import type { SearchByItem, SearchType  } from "@/api/queryParams/types";

type Options = {
  text: string;
  search: {
    variable: string[],
    value: string | null
  }[];
};

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  search: SearchType;
  options: Options[]; // 🔥 TABLICA
  nosort?: boolean;
};

function HeaderSearchSelect({
  search,
  setSearch,
  setPage,
  options,
  nosort = false,
}: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedIndex = Number(e.target.value);

    const newSearchBy: SearchByItem[] = search.searchBy
      ? [...search.searchBy]
      : [];

    let selectedOption = options[selectedIndex];

    selectedOption.search.forEach(element => {
        // szukamy grupy dokładnie z tymi fields
        const foundIndex = newSearchBy.findIndex(
        (item) =>
            item.fields.length === element.variable.length &&
            item.fields.every((f) => element.variable.includes(f))
        );

        if (!element.value) {
            // usuń filtr
            if (foundIndex !== -1) {
                newSearchBy.splice(foundIndex, 1);
            }
        } else {
            const newItem: SearchByItem = {
                fields: element.variable,
                value: element.value,
            };

            if (foundIndex !== -1) {
                newSearchBy[foundIndex] = newItem;
            } else {
                newSearchBy.push(newItem);
            }
        }
    });

    setSearch({
        search: null,
        searchBy: newSearchBy.length ? newSearchBy : null,
    });

    // reset paginacji
    setPage("?page=1");
  };

  return (
    <th>
      <div className="flex flex-row p-2 mb-2">
        <div className={nosort ? "flex-1" : "flex-1 me-2"}>

            <Select
                name="user_id"
                onChange={handleChange}
                disabled={search.search !== null}
                className={
                `custom-select font-normal w-full px-3 py-2 border rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 ` +
                (search.search
                    ? "text-gray-500 border-gray-400 bg-neutral-300"
                    : "text-gray-900 border-gray-400 bg-white")
                }
                >
                    <>
                    {options.map( (item,key) => (
                        <option key={key} value={key}>{item.text}</option>
                    ))}
                    </>
            </Select>
        </div>
        <div className={nosort ? "w-2" : "w-3"}></div>
      </div>
    </th>
  );
}

export default HeaderSearchSelect;