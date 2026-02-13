import { useState,useEffect } from "react";
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { SquarePlus,SquarePen,Trash2 } from "lucide-react";
import { Card, Button , Pagination , HeaderSorting, HeaderSearch, HeaderSearchMeany,Error,TableDataLoading } from '@/components';

// Model //

import type { ItemFullType } from '@/models/Car.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";
import { carService } from "@/api/services/backend/user/car.service";

import type { SearchType,SortType } from '@/api/queryParams/types'
import type { PaginatedDataResponse,PaginationData } from "@/api/response/types";

import { buildPaginationParams } from "@/api/queryParams/buildPaginationParams";



const Index = () => {

    const DEFAULT_SORT:SortType = [{
        sortBy: 'registration_number',
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
    const [items, setItems] = useState<ItemFullType[] | null>(null);

    const [page, setPage] = useState<string>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    const [search, setSearch] = useState<SearchType>(DEFAULT_SEARCH);
    const [sort, setSort] = useState<SortType>(DEFAULT_SORT);

    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const [canSeeUserField, setCanSeeUserField] = useState<boolean>(false);

    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading, error, mutate } = useBackend<PaginatedDataResponse<ItemFullType[],{can_see_user_field: boolean;}>>(
        "get",
        carService.paths.getAll
    );

    useEffect(() => {
        const params = buildPaginationParams({page,perPage,search,sort});
        mutate({params: params}).then((res) => {
            setItems(res.data.data);
            setPagination(res.data.meta);
            setCanSeeUserField(res.data.can_see_user_field);
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
                    <div>Auta Użytkownika</div>
                </Card.Header>
                <Card.Body>
                    <div className="pb-4 flex justify-end gap-2">
                        <Link to={ROUTES.USER.CARS.CREATE.LINK}>
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
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["registration_number"]} text="Nr. Rejestracyjny" />                                
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["brand"]} text="Marka" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["model"]} text="Model" />
                                {canSeeUserField && (
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["user.name","user.surname"]} text="Użytkownik" />
                                )}
                                <HeaderSorting sort={sort} setSort={setSort} text="Przyciski" />  
                            </tr>
                            <tr>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["registration_number"]}/> 
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["brand"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["model"]}/>
                                {canSeeUserField && (
                                    <th></th>
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
                                        item.deleted_at
                                        ? " text-red-700 dark:text-red-500 bg-gray-400 dark:bg-neutral-950"
                                        : (key % 2 === 0
                                        ? "bg-gray-100 dark:bg-neutral-900/50"
                                        : "bg-white dark:bg-neutral-800")
                                    }`}>
                                    <td className="p-2">
                                        {item.deleted_at ? 
                                        <div className="flex flex-row content-center"><Trash2 size={18}/><span className="ms-2">{item.registration_number}</span></div>
                                        : 
                                        <>{item.registration_number}</>
                                        }
                                    </td>
                                    <td className="p-2">{item.brand}</td>
                                    <td className="p-2">{item.model}</td>
                                    {canSeeUserField && (
                                        <td className="p-2">{item.user ? `${item.user.names.name} ${item.user.names.surname}` : '-'}</td>
                                    )}
                                    <td className="p-2 whitespace-nowrap overflow-hidden text-right">
                                        <div className="flex flex-row justify-center gap-1">
                                            <Link to={ROUTES.USER.CARS.EDIT.LINK(item.id)}>
                                                <Button color="yellow">
                                                    <SquarePen size={20}/>
                                                </Button>
                                            </Link>
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