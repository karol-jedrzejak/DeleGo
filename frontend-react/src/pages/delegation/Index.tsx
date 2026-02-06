import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";
import { AuthContext } from "@/providers/AuthProvider.js";

// Komponenty UI //

import pdf_icon from "@/assets/icons/pdf_icon.svg"

import { SquarePlus,SquarePen,Search } from "lucide-react";
import { Card, Button , Pagination , HeaderSorting,HeaderSearchMeany,Error,TableDataLoading,HeaderSearch,HeaderSearchSelect} from '@/components';

// Model //

import type { ItemBasicType } from '@/models/Delegation.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";
import { delegationService } from "@/api/services/backend/user/delegation.service";

import type { SearchType,SortType } from '@/api/queryParams/types'
import type { PaginatedDataResponse,PaginationData } from "@/api/response/types";

import { buildPaginationParams } from "@/api/queryParams/buildPaginationParams";



const Index = () => {

    const DEFAULT_SORT:SortType = [{
        sortBy: 'return',
        sortDir: 'asc',
    }];

    const DEFAULT_SEARCH:SearchType = {
        search: null,
        searchBy: null,
    };

    const DEFAULT_PAGE:string = "1";

    const DEFAULT_PER_PAGE:number = 10;


    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //
    const authData = useContext(AuthContext);

    const [items, setItems] = useState<ItemBasicType[] | null>(null);

    const [page, setPage] = useState<string>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    const [search, setSearch] = useState<SearchType>(DEFAULT_SEARCH);
    const [sort, setSort] = useState<SortType>(DEFAULT_SORT);

    const [pagination, setPagination] = useState<PaginationData | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<PaginatedDataResponse<ItemBasicType[]>>(
        "get",
        delegationService.paths.getAll
    );

    useEffect(() => {
        const params = buildPaginationParams({page,perPage,search,sort});
        
        mutate({params: params}).then((res) => {
            const { data, ...pagination } = res.data;
            console.log(res.data);
            setItems(data);
            setPagination(pagination);
        });
    }, [page, perPage,search,sort]);

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu
    // -------------------------------------------------------------------------- //

    if(error) { return <Error><Error.Text type={error.type}>{error.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <div className="flex-1 text-sm">
            <Card>
                <Card.Header>
                    <div>Delegacje</div>
                </Card.Header>
                <Card.Body>
                    <div className="pb-4 flex justify-end gap-2">
                        <Link to={ROUTES.DELEGATION.CREATE.LINK}>
                            <Button 
                                color="green"
                                className="flex items-center">
                                    <SquarePlus size={18}/>
                                    <div className="ps-1">Dodaj</div>
                            </Button>
                        </Link>
                        <HeaderSearchMeany  search={search} setSearch={setSearch} setPage={setPage}/>
                    </div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="font-normal">
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["return","departure"]} text="Daty" />                                
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["company.name_short","custom_address"]} text="Firma / Adres" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["description"]} text="Opis" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["settled"]} text="Rozliczone" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["status"]} text="Status" />
                                {authData.hasPermission('admin','admin') && (
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["user.name","user.surname"]} text="Użytkownik" />
                                )}
                                <HeaderSorting sort={sort} setSort={setSort} text="Przyciski" />  
                            </tr>
                            <tr>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["return","departure"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["company.name_short","custom_address"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["description"]}/>
                                <HeaderSearchSelect
                                    search={search} setSearch={setSearch} setPage={setPage} options={
                                        [
                                            {
                                                text: "-",
                                                search: [{
                                                    variable: ["settled"],
                                                    value: null
                                                }],
                                            },
                                            {
                                                text: "Tak",
                                                search: [{
                                                    variable: ["settled"],
                                                    value: "1"
                                                }],
                                            },
                                            {
                                                text: "Nie",
                                                search: [{
                                                    variable: ["settled"],
                                                    value: "0"
                                                }],
                                            },
                                        ]
                                    }/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["status"]}/>
                                {authData.hasPermission('admin','admin') && (
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["user.name","user.surname"]}/>
                                )}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="relative">
                            {/* Spiner i brak danych */}
                            <TableDataLoading loading={loading} items={items} colNumber={7}/>

                            {/*  Rekordy */}                     
                            {items?.map( (item,key) => (
                                <tr key={key} className={`border-t border-neutral-300 dark:border-neutral-700 ${
                                            key % 2 === 0
                                            ? "bg-gray-100 dark:bg-neutral-900/50"
                                            : "bg-white dark:bg-neutral-800"
                                        }`}>
                                    <td className="p-2">
                                        {item.dates.return.slice(0, 10) == item.dates.departure.slice(0, 10) ? (
                                            <>{item.dates.return.slice(0, 10)}</>
                                        ):(
                                            <>{item.dates.return.slice(0, 10)} - {item.dates.departure.slice(0, 10)}</>
                                        )}
                                    </td>
                                    <td className="p-2">{item.company?.id ? (
                                        <><Link to={ROUTES.COMPANY.SHOW.LINK(item.company.id)}>
                                            <Button color="sky">
                                                {item.company.names.name_short}
                                            </Button>
                                        </Link></>
                                        ):(
                                        <>{item.custom_address}</>
                                        )}
                                    </td>
                                    <td className="p-2">{item.description}</td>
                                    <td className="p-2">
                                        <div className="flex w-full flex-row items-center justify-center pr-4">
                                        {item.settled ? (
                                            <span className="py-1 px-2 text-white bg-green-800 rounded-md">Tak</span>
                                        ):(
                                            <span className="py-1 px-2 text-white bg-red-800 rounded-md">Nie</span>
                                        )}
                                        </div>
                                    </td>
                                    <td className="p-2">{item.status_label}</td>
                                    {authData.hasPermission('admin','admin') && (
                                        <td className="p-2">{item.user?.names.name} {item.user?.names.surname}</td>
                                    )}
                                    <td className="p-2 whitespace-nowrap overflow-hidden text-right">
                                        <div className="flex flex-row justify-center gap-1">
                                            <Link to={ROUTES.DELEGATION.PDF.LINK(item.id)}>
                                                <Button color="white" className="w-[38px]">
                                                    <img src={pdf_icon} className="w-10 "/>
                                                </Button>
                                            </Link>
                                            <Link to={ROUTES.DELEGATION.SHOW.LINK(item.id)}>
                                                <Button color="sky" className="w-[38px]">
                                                    <Search size={20}/>
                                                </Button>
                                            </Link>
                                            {item.user_can_edit ? 
                                            <Link to={ROUTES.DELEGATION.EDIT.LINK(item.id)}>
                                                <Button color="yellow">
                                                    <SquarePen size={20}/>
                                                </Button>
                                            </Link> : 
                                                <Button color="yellow" disabled>
                                                    <SquarePen size={20}/>
                                                </Button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination setPerPage={setPerPage} setPage={setPage} paginationData={pagination}/>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Index;