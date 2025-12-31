import React from "react";
import type { SortItem, SortType } from "@/api/queryParams/types";

type Props = {
  setSort: React.Dispatch<React.SetStateAction<SortType>>,
  sort: SortType,
  variable_names?: string[] | null;
  text: string,
};

function HeaderSorting({ setSort, sort, variable_names = null, text }: Props) {

    const handleSort = (click: React.MouseEvent<HTMLButtonElement>, newSorts: SortItem[]) => {
        if (click.ctrlKey) {
            // Dodawanie lub modyfikacja w istniejącym sort
            const updatedSort: SortType = [...sort];
            newSorts.forEach(newSort => {
                const foundIndex = updatedSort.findIndex(item => item.sortBy === newSort.sortBy);
                if (foundIndex !== -1) {
                    if (newSort.sortDir === "change") {
                        newSort.sortDir = updatedSort[foundIndex].sortDir === "asc" ? "desc" : "asc";
                    }
                    updatedSort[foundIndex] = newSort;
                } else {
                    newSort.sortDir = newSort.sortDir === "change" ? "asc" : newSort.sortDir;
                    updatedSort.push(newSort);
                }
            });
            setSort(updatedSort);
        } else {
            // Bez CTRL - ustawienie tylko podanych kolumn
            const newSortProcessed = newSorts.map(newSort => {
                if (newSort.sortDir === "change") {
                    const existing = sort.find(item => item.sortBy === newSort.sortBy);
                    return { sortBy: newSort.sortBy, sortDir: existing?.sortDir === "asc" ? "desc" : "asc" };
                }
                return newSort;
            });
            setSort(newSortProcessed);
        }
    };

    const isActive = variable_names
        ? sort.some(item => variable_names.includes(item.sortBy))
        : false;

    return (
        <th>
            {variable_names && variable_names.length > 0 ? (
                <div className="p-2 flex justify-between items-center">
                    <button
                        className={`bg-neutral-100 dark:bg-neutral-700 border rounded-md p-2 flex-1 me-2 cursor-pointer text-left ` +
                            (isActive ? `border-sky-600` : `border-neutral-500`)}
                        onClick={(e) =>
                            handleSort(
                                e,
                                variable_names.map(v => ({ sortBy: v, sortDir: "change" }))
                            )
                        }
                    >
                        {text}
                    </button>
                    <div className="flex flex-col text-xs">
                        <button
                            onClick={(e) =>
                                handleSort(
                                    e,
                                    variable_names.map(v => ({ sortBy: v, sortDir: "asc" }))
                                )
                            }
                            className={`cursor-pointer ` + (sort.some(item => variable_names.includes(item.sortBy) && item.sortDir === "asc") ?
                                `text-sky-800 hover:text-sky-500 dark:text-sky-800 dark:hover:text-sky-500` :
                                `text-neutral-700 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-white`)}>
                            ▲
                        </button>
                        <button
                            onClick={(e) =>
                                handleSort(
                                    e,
                                    variable_names.map(v => ({ sortBy: v, sortDir: "desc" }))
                                )
                            }
                            className={`cursor-pointer ` + (sort.some(item => variable_names.includes(item.sortBy) && item.sortDir === "desc") ?
                                `text-sky-800 hover:text-sky-500 dark:text-sky-800 dark:hover:text-sky-500` :
                                `text-neutral-700 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-white`)}>
                            ▼
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-2 flex justify-between">
                    <div className="bg-neutral-100 dark:bg-neutral-700 border rounded-md p-2 flex-1 me-2 text-left">
                        {text}
                    </div>
                </div>
            )}
        </th>
    );
}

export default HeaderSorting;