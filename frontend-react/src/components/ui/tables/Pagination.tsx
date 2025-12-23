
import React from "react";

import { ChevronLeft,ChevronRight,ChevronFirst,ChevronLast } from "lucide-react";

type Link = {
    url: string | null,
    label: string,
    Previous: string,
    page: string | null,
    active: Boolean,
};

type Response = {
    current_page: number,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: Link[],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number,   
};


type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>,
  setPerPage: React.Dispatch<React.SetStateAction<number>>,
  paginationData: Response | null,
};

function Pagination({ setPage,setPerPage, paginationData }: Props) {

    let active = 
        "w-8 h-8 flex justify-center items-center cursor-pointer border "+
        "border-neutral-300 hover:bg-(--app_color) "+
        "dark:hover:bg-neutral-700 dark:border-white/10";
    let current = 
        "w-8 h-8 flex justify-center items-center cursor-pointer border "+
        "border-neutral-300 bg-(--app_color_second) hover:bg-(--app_color) "+
        "dark:bg-(--app_color_second)/50 dark:hover:bg-(--app_color_second)/75 dark:border-white/10";
    let inactive = 
        "w-8 h-8 flex justify-center items-center border "+
        "border-neutral-300 text-neutral-500 bg-neutral-200 "+
        "dark:text-neutral-500 dark:bg-neutral-900 dark:border-white/10";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(+e.target.value);
        setPage("1");
    };

    return (
        <>
            <hr className="my-3 border-neutral-500 dark:border-neutral-500 bg-black" />
            <div className="flex justify-between items-center">
                <div className="text-neutral-600 dark:text-neutral-400">Strona {paginationData?.current_page} z {paginationData?.last_page}</div>
                <div className="flex flex-row items-center">
                    <select
                        onChange={handleChange}
                        name="perPage"
                        id="perPage"
                        className="custom-select w-[60px] m-2 px-2 py-1 border text-gray-900 dark:text-gray-900 border-gray-400 dark:border-gray-200 bg-neutral-100 rounded-md focus:outline-none shadow-md focus:ring-3 focus:ring-(--app_color_dark)">
                        <option value="10">10   </option>
                        <option value="25">25   </option>
                        <option value="50">50   </option>
                        <option value="100">100   </option>
                    </select>
                    <div>Rekordów na stronę</div>
                </div>
                <div className="flex flex-row">
                    <div
                        className={`rounded-s-md  `+( paginationData?.first_page_url && paginationData?.current_page != 1 ? `${active}` : `${inactive}`)}
                        onClick={paginationData?.first_page_url && paginationData?.current_page != 1 ? () => setPage(paginationData.first_page_url.split('=')[1]) : undefined}
                        >
                            <ChevronFirst size={20}/>
                    </div>
                    <>{
                            
                    paginationData?.links.map( (link,key) => (
                        <div
                            key={key}
                            className={( link.url ? ( link.active ? `${current}` : `${active}`) : `${inactive}`)}
                            onClick={link.url ? () => setPage(link.url?.split('=')[1] as string) : undefined}
                            >
                            {link.label == "&laquo; Previous" && (<ChevronLeft size={20}/>)}
                            {link.label == "Next &raquo;" && (<ChevronRight size={20}/>)}
                            {link.label != "Next &raquo;" && link.label != "&laquo; Previous" && (<>{link.label}</>)}
                        </div>
                    ))}
                    </>
                    <div
                        className={`rounded-e-md  `+( paginationData?.last_page_url && paginationData?.current_page != paginationData?.last_page ? `${active}` : `${inactive}`)}
                        onClick={paginationData?.last_page_url && paginationData?.current_page != paginationData?.last_page ? () => setPage(paginationData.last_page_url.split('=')[1]) : undefined}
                        >
                            <ChevronLast size={20}/>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Pagination
