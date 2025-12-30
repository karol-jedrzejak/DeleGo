import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";
import { AuthContext } from "@/providers/AuthProvider.js";

// Komponenty UI //

import { Search,SquarePlus,SquarePen } from "lucide-react";
import { Card, Button , Pagination , HeaderSorting,HeaderSortingArray, HeaderSearchMeany,Error,TableDataLoading,HeaderSearch,HeaderSearchArray } from '@/components';

// Model //

import type { DataType, ItemType } from '@/models/Delegation.tsx';
import {DEFAULT_SEARCH, DEFAULT_SORT,DEFAULT_PAGE,DEFAULT_PER_PAGE} from '@/models/Delegation.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";
import { delegationService } from "@/api/services/backend/user/delegation.service";

import type { SearchType,SortType } from '@/api/queryParams/types'
import type { PaginatedDataResponse,PaginationData } from "@/api/response/types";

import { buildPaginationParams } from "@/api/queryParams/buildPaginationParams";



const Index = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //
    const authData = useContext(AuthContext);

    const [items, setItems] = useState<DataType | null>(null);

    const [page, setPage] = useState<string>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    const [search, setSearch] = useState<SearchType>(DEFAULT_SEARCH);
    const [sort, setSort] = useState<SortType>(DEFAULT_SORT);

    const [pagination, setPagination] = useState<PaginationData | null>(null);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<PaginatedDataResponse<DataType>>(
        "get",
        delegationService.paths.getAll
    );

    useEffect(() => {
        const params = buildPaginationParams({page,perPage,search,sort});
        
        mutate({params: params}).then((res) => {
            const { data, ...pagination } = res.data;

            console.log([...params]);
            console.log(data,pagination);

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
                        <Link to={ROUTES.COMPANY.CREATE.LINK}>
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
                                <HeaderSortingArray sort={sort} setSort={setSort} variable_names={["return","departure"]} text="Daty" />                                
                                <HeaderSortingArray sort={sort} setSort={setSort} variable_names={["company.name_short","custom_address"]} text="Firma / Adres" />
                                <HeaderSortingArray sort={sort} setSort={setSort} variable_names={["car.brand","car.model","car.registration_number"]} text="Auto" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="description" text="Opis" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="settled" text="Rozliczone" />
                                {authData.hasPermission('admin','admin') && (
                                <HeaderSortingArray sort={sort} setSort={setSort} variable_names={["user.name","user.surname"]} text="Użytkownik" />
                                )}
                                <HeaderSorting sort={sort} setSort={setSort} text="Przyciski" />  
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
                                        {item.return.slice(0, 10) == item.departure.slice(0, 10) ? (
                                            <>{item.return.slice(0, 10)}</>
                                        ):(
                                            <>{item.return.slice(0, 10)} - {item.departure.slice(0, 10)}</>
                                        )}
                                    </td>
                                    <td className="p-2">{item.company?.id ? (
                                        <><Link to={ROUTES.COMPANY.SHOW.LINK(item.company.id)}>
                                            <Button color="sky">
                                                {item.company.name_short}
                                            </Button>
                                        </Link></>
                                        ):(
                                        <>{item.custom_address}</>
                                        )}
                                    </td>
                                    <td className="p-2">{item.car?.brand} {item.car?.model} {item.car?.registration_number}</td>
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
                                    {authData.hasPermission('admin','admin') && (
                                        <td className="p-2">{item.user?.name} {item.user?.surname}</td>
                                    )}
                                    <td className="p-2 whitespace-nowrap overflow-hidden text-right">
                                        <Link to={ROUTES.DELEGATION.SHOW.LINK(item.id)}>
                                            <Button color="sky">
                                                <Search size={20}/>
                                            </Button>
                                        </Link>
                                        <Link to={ROUTES.DELEGATION.EDIT.LINK(item.id)} className="ps-1">
                                            <Button color="yellow">
                                                <SquarePen size={20}/>
                                            </Button>
                                        </Link>
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