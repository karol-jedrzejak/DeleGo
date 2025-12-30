
import React from "react";

type SortItem = {
    sortBy: string;
    sortDir: string;
};

type Sort = SortItem[];


type Props = {
  setSort: React.Dispatch<React.SetStateAction<Sort>>,
  sort: Sort,
  variable_name?: string | null,
  text: string,
};

function HeaderSorting({ setSort, sort, variable_name = null, text }: Props) {

    const handleSort = (click: React.MouseEvent<HTMLButtonElement>,newSort: SortItem) => {

        if (click.ctrlKey) {
            if(newSort.sortDir == "change")
            {
                let foundIndex = sort.findIndex(item => item.sortBy == newSort.sortBy);
                if(foundIndex != -1){
                    if(sort[foundIndex].sortDir == "asc")
                    {
                        newSort.sortDir = "desc";
                    }else{
                        newSort.sortDir = "asc";
                    }
                    const newSortArray: Sort = [...sort];
                    newSortArray[foundIndex] = newSort;
                    setSort(newSortArray);
                } else {
                    newSort.sortDir = "asc";
                    setSort(prev => [
                        ...prev, 
                        newSort
                    ])
                }
            } else {
                let foundIndex = sort.findIndex(item => item.sortBy == newSort.sortBy);
                if(foundIndex != -1){
                    const newSortArray: Sort = [...sort];
                    newSortArray[foundIndex] = newSort;
                    setSort(newSortArray);
    
                } else {
                    setSort(prev => [
                        ...prev, 
                        newSort
                    ])
                }
            }
        } else {
            if(newSort.sortDir == "change")
            {
                // Zmiana na inny jesli (jesli ten sam) lub ten sam w innym kierunku bez CTRL
                let foundIndex = sort.findIndex(item => item.sortBy == newSort.sortBy);
                if(foundIndex != -1){
                    if(sort[foundIndex].sortDir == "asc")
                    {
                        newSort.sortDir = "desc";
                    }else{
                        newSort.sortDir = "asc";
                    }
                    setSort([newSort]);
                } else {
                    newSort.sortDir = "asc";
                    setSort([newSort]);
                }
            } else {
                // Ustawienie nowego jesli bez CTRL
                setSort([newSort]);
            }
        }
    }

    return (
        <th>
            {variable_name ? (
                <div className="p-2 flex justify-between items-center">
                    <button
                    className={`bg-neutral-100 dark:bg-neutral-700 border rounded-md p-2 flex-1 me-2 cursor-pointer text-left `
                        + (sort.find(item => item.sortBy === variable_name) ?
                        `border-sky-600`:
                        `border-neutral-500`)}
                    onClick={(e) => handleSort(e,{
                            sortBy: variable_name,
                            sortDir: 'change',
                        })}
                    >{text}</button>
                    <div className="flex flex-col text-xs">
                        <button
                            onClick={(e) => handleSort(e,{
                                sortBy: variable_name,
                                sortDir: 'asc',
                            })}
                            className={`cursor-pointer ` + (sort.find(item => item.sortBy === variable_name)?.sortDir === "asc" ?
                            `text-sky-800 hover:text-sky-500 dark:text-sky-800 dark:hover:text-sky-500`:
                            `text-neutral-700 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-white`)}>▲
                        </button>
                        <button
                            onClick={(e) => handleSort(e,{
                                sortBy: variable_name,
                                sortDir: 'desc',
                            })}
                            className={`cursor-pointer ` + (sort.find(item => item.sortBy === variable_name)?.sortDir === "desc" ?
                            `text-sky-800 hover:text-sky-500 dark:text-sky-800 dark:hover:text-sky-500`:
                            `text-neutral-700 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-white`)}>▼
                        </button>
                    </div>
                </div>
            ):(
                <div className="p-2 flex justify-between">
                    <div className="bg-neutral-100 dark:bg-neutral-700 border rounded-md p-2 flex-1 me-2 text-left">
                        {text}
                    </div>
                </div>
            )}
        </th>
    )
}

export default HeaderSorting
