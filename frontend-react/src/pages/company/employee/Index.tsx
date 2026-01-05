import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Search,SquarePlus,SquarePen,Mail,Phone , Trash2} from "lucide-react";
import { Loading, Card, Button , Pagination , HeaderSorting, HeaderSearch, HeaderSearchMeany,Error,TableDataLoading,Spinner } from '@/components';

import { Buttons as ParentButtons } from '@/features/company/components/Buttons';

// Model //
import type { DataType } from '@/models/Employee.tsx';
import type { ItemType as ParentItemType } from '@/models/Company.tsx';
import { DEFAULT_SEARCH, DEFAULT_SORT,DEFAULT_PAGE,DEFAULT_PER_PAGE } from '@/models/Company.tsx';

// API //

import { useBackend } from "@/hooks/useLaravelBackend";

import { companyService } from "@/api/services/backend/company/company.service";
import { employeeService } from "@/api/services/backend/company/employee.service";

import type { SearchType,SortType } from '@/api/queryParams/types'
import type { PaginatedDataResponse,PaginationData } from "@/api/response/types";

import { buildPaginationParams } from "@/api/queryParams/buildPaginationParams";



const Index = () => {

    // -------------------------------------------------------------------------- //
    // Deklaracja stanów
    // -------------------------------------------------------------------------- //

    const { parent_id } = useParams<{ parent_id: string }>();

    const [items, setItems] = useState<DataType | null>(null);
    const [parent, setParent] = useState<ParentItemType | null>(null);

    const [page, setPage] = useState<string>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    const [search, setSearch] = useState<SearchType>(DEFAULT_SEARCH);
    const [sort, setSort] = useState<SortType>(DEFAULT_SORT);

    const [pagination, setPagination] = useState<PaginationData | null>(null);
    
    // -------------------------------------------------------------------------- //
    // Pobranie danych
    // -------------------------------------------------------------------------- //

    const { loading:loadingItems, error:errorItems, mutate:mutateItems } = useBackend<PaginatedDataResponse<DataType>>(
        "get",
        employeeService.paths.getAll(parent_id ?? "")
    );

    const { loading:loadingParent, error:errorParent, mutate:mutateParent } = useBackend<ParentItemType>(
        "get",
        companyService.paths.getById(parent_id ?? "")
    );

    useEffect(() => {
        const params = buildPaginationParams({page,perPage,search,sort});
        mutateItems({params: params}).then((res) => {
            const { data, ...pagination } = res.data;
            setItems(data);
            setPagination(pagination);
        });
    }, [page, perPage,search,sort]);

    useEffect(() => {
        mutateParent()
            .then((res) => {
                setParent(res.data);
            }).catch(() => {});
    }, []);

    // -------------------------------------------------------------------------- //
    // Wyświetlanie błędu
    // -------------------------------------------------------------------------- //
    if(!parent || loadingParent) return <Loading/>
    if(errorItems) { return <Error><Error.Text type={errorItems?.type}>{errorItems?.text}</Error.Text></Error>; }
    if(errorParent) { return <Error><Error.Text type={errorParent?.type}>{errorParent?.text}</Error.Text></Error>; }

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            {parent && !loadingParent &&
            <div className="flex-1 text-sm">
                <Card>
                    <Card.Header>
                        <div>Pracownicy</div>
                    </Card.Header>
                    <Card.Body>
                        {parent && !loadingParent ?
                        (
                        <div className="pb-4 flex flex-col justify-center lg:flex-row lg:justify-between gap-2">
                            <ParentButtons company={parent}/>
                            <div className="flex flex-row items-center justify-center lg:justify-end gap-2">
                                <Link to={ROUTES.COMPANY.EMPLOYEE.CREATE.LINK(parent.id)}>
                                    <Button 
                                        color="green"
                                        className="flex items-center">
                                            <SquarePlus size={18}/>
                                            <div className="ps-1">Dodaj</div>
                                    </Button>
                                </Link>
                                <HeaderSearchMeany  search={search} setSearch={setSearch} setPage={setPage}/>
                            </div>
                        </div>
                        ):(
                            <div className="p-4 w-full flex justify-center items-center ">
                                <Spinner/>
                            </div>
                        )}
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="font-normal">
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["name","surname"]} text="Imię i Nazwisko" />
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["position"]} text="Stanowisko" />                                
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["email"]} text="E-mail" />
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["phone_mobile"]} text="Tel. Komórkowy" />
                                    <HeaderSorting sort={sort} setSort={setSort} variable_names={["phone_landline"]} text="Tel. Stacjonarny" />
                                    <HeaderSorting sort={sort} setSort={setSort} text="Przyciski" />  
                                </tr>
                                <tr>
                                    <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["name","surname"]}/> 
                                    <HeaderSearch search={search} setSearch={setSearch} setPage={setPage} variable_names={["position"]}/>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="relative">
                                {/* Spiner i brak danych */}
                                <TableDataLoading loading={loadingItems} items={items} colNumber={7}/>

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
                                            <div className="flex flex-row content-center"><Trash2 size={18}/><span className="ms-2">{item.name} {item.surname}</span></div>
                                            : 
                                            <>{item.name} {item.surname}</>
                                            }
                                        </td>
                                        <td className="p-2">{item.position}</td>
                                        <td className="p-2">
                                            {item.email ? (
                                            <Button
                                            onClick={() => {window.location.href = "mailto:"+item.email+"?subject=Temat";}}
                                            size={2} color="teal" className="flex flex-row items-center"
                                            
                                            >
                                                <Mail size={16}/>
                                                <div className="ps-1">{item.email}</div>
                                            </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {item.phone_mobile ? (
                                                <Button
                                            onClick={() => {window.location.href = "tel:"+item.phone_mobile;}}
                                            size={2} color="lime" className="flex flex-row items-center"
                                            >
                                                <Phone size={16}/>
                                                <div className="ps-1">{item.phone_mobile}</div>
                                            </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {item.phone_landline ? (
                                                <Button
                                            onClick={() => {window.location.href = "tel:"+item.phone_landline;}}
                                            size={2} color="lime" className="flex flex-row items-center"
                                            >
                                                <Phone size={16}/>
                                                <div className="ps-1">{item.phone_landline}</div>
                                            </Button>
                                            ):(
                                            <>-</>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-row justify-center gap-1">
                                                <Link to={ROUTES.COMPANY.EMPLOYEE.SHOW.LINK(item.id)}>
                                                    <Button color="sky">
                                                        <Search size={20}/>
                                                    </Button>
                                                </Link>
                                                <Link to={ROUTES.COMPANY.EMPLOYEE.EDIT.LINK(item.id)}>
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
            }
        </>
        );
    };

export default Index;