import { useState,useEffect } from "react";
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Trash2,Search,SquarePlus,SquarePen,Map,Users } from "lucide-react";
import { Card, Button , Pagination , HeaderSorting, HeaderSearch, HeaderSearchMeany,Error,TableDataLoading } from '@/components';

// Model //

import type { DataType, ItemType } from '@/models/Delegation.tsx';
import {DEFAULT_SEARCH, DEFAULT_SORT,DEFAULT_PAGE,DEFAULT_PER_PAGE} from '@/models/Delegation.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";
import { delegationService } from "@/api/services/backend/user/delegation.service";

import type { SearchType,SortType } from '@/api/queryParams/types'
import type { PaginatedDataResponse,PaginationData } from "@/api/response/types";

import { buildPaginationParams } from "@/api/queryParams/buildPaginationParams";

// Utilities //

import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";
import { formatAddress } from "@/features/company/utilities/formatAddress";


const Index = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

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
            console.log(data,pagination)
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
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="departure" text="Daty" />                                
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="name_complete" text="Firma / Adres" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="country" text="Kraj" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_name="region" text="Region" />
                                <HeaderSorting sort={sort} setSort={setSort} text="Adres" />
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
                                    <td className="p-2">{item.return} - {item.departure}</td>
                                    <td className="p-2">{item.company?.id ? (
                                        <>Firma: {item.company?.name_short}</>
                                        ):(
                                        <>Address: {item.custom_address}</>
                                        )}
                                    </td>
                                    <td className="p-2">{item.description}</td>
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