import { useState,useEffect } from "react";
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Trash2,Search,SquarePlus,SquarePen,Map,Users } from "lucide-react";
import { Card, Button , Pagination , HeaderSorting, HeaderSearch, HeaderSearchMeany,Error,TableDataLoading } from '@/components';

// Model //

import type { DataType } from '@/models/Company.tsx';
import {DEFAULT_SEARCH, DEFAULT_SORT,DEFAULT_PAGE,DEFAULT_PER_PAGE} from '@/models/Company.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";
import { companyService } from "@/api/services/backend/company/company.service";

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
        companyService.paths.getAll
    );

    useEffect(() => {
        const params = buildPaginationParams({page,perPage,search,sort});
        mutate({params: params}).then((res) => {
            const { data, ...pagination } = res.data;
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
                    <div>Firmy</div>
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
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["name_short"]} text="Nazwa Skrócona" />                                
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["name_complete"]} text="Nazwa Pełna" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["country"]} text="Kraj" />
                                <HeaderSorting sort={sort} setSort={setSort} variable_names={["region"]} text="Region" />
                                <HeaderSorting sort={sort} setSort={setSort} text="Adres" />
                                <HeaderSorting sort={sort} setSort={setSort} text="Przyciski" />  
                            </tr>
                            <tr>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["name_short"]}/> 
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["name_complete"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["country"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["region"]}/>
                                <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} nosort={true} text="Wuszykaj po miejscowości" variable_names={["city","street","postal_city"]}/>
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
                                        <div className="flex flex-row content-center"><Trash2 size={18}/><span className="ms-2">{item.name_short}</span></div>
                                        : 
                                        <>{item.name_short}</>
                                        }
                                    </td>
                                    <td className="p-2">{item.name_complete}</td>
                                    <td className="p-2">{item.country}</td>
                                    <td className="p-2">{item.region}</td>
                                    <td className="p-2">
                                        <Button
                                        color="teal" size={2} className="flex flex-row items-center"
                                        onClick={() => window.open(buildCompanyGoogleMapsUrl(item), "_blank")}
                                        >
                                            <Map size={16}/>
                                            <div className="ps-1">{formatAddress(item)}</div>
                                        </Button>
                                    </td>
                                    <td className="p-2 whitespace-nowrap overflow-hidden text-right">
                                        <div className="flex flex-row justify-center gap-1">
                                            <Link to={ROUTES.COMPANY.SHOW.LINK(item.id)}>
                                                <Button color="sky">
                                                    <Search size={20}/>
                                                </Button>
                                            </Link>
                                            <Link to={ROUTES.COMPANY.EMPLOYEE.INDEX.LINK(item.id)}>
                                                <Button color="emerald">
                                                    <Users size={20}/>
                                                </Button>
                                            </Link>
                                            <Link to={ROUTES.COMPANY.EDIT.LINK(item.id)}>
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