
import React from "react";
import { useState } from "react";

import type { SearchByItem, SearchType  } from "@/api/queryParams/types";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  search: SearchType;
  variable_names: string[]; // 🔥 TABLICA
  text?: string;
  nosort?: boolean;
};

function HeaderSearch({
  search,
  setSearch,
  setPage,
  variable_names,
  text = "Wyszukaj",
  nosort = false,
}: Props) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const newSearchBy: SearchByItem[] = search.searchBy
      ? [...search.searchBy]
      : [];

    // szukamy grupy dokładnie z tymi fields
    const foundIndex = newSearchBy.findIndex(
      (item) =>
        item.fields.length === variable_names.length &&
        item.fields.every((f) => variable_names.includes(f))
    );

    if (inputValue === "") {
      // usuń filtr
      if (foundIndex !== -1) {
        newSearchBy.splice(foundIndex, 1);
      }
    } else {
      const newItem: SearchByItem = {
        fields: variable_names,
        value: inputValue,
      };

      if (foundIndex !== -1) {
        newSearchBy[foundIndex] = newItem;
      } else {
        newSearchBy.push(newItem);
      }
    }

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
          <input
            type="text"
            value={search.search ? "" : value}
            onChange={handleChange}
            placeholder={text}
            disabled={search.search !== null}
            className={
              `font-normal w-full px-3 py-2 border rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-sky-600 ` +
              (search.search
                ? "text-gray-500 border-gray-400 bg-neutral-300"
                : "text-gray-900 border-gray-400 bg-white")
            }
          />
        </div>
        <div className={nosort ? "w-2" : "w-3"}></div>
      </div>
    </th>
  );
}

export default HeaderSearch;