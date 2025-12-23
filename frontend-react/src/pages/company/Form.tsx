
import React, { useState, useContext } from 'react';


import { MessageContext } from "@/providers/MessageProvider.js";

// Komponenty UI //

import { LocateFixed,Map } from "lucide-react";
import { Input, Button , Select, Line } from '@/components';

// Model //

import type { FormDataType,FormPropsType } from '@/models/Company.tsx';

// API //

import { getCompanyDataByNIP } from '@/features/company/services/getCompanyDataByNIP';

// Utilities //

import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";


export default function Form({formData,setFormData,formError}:FormPropsType) {

    // -------------------------------------------------------------------------- //
    // Definicje standardowych stanów i kontekstów
    // -------------------------------------------------------------------------- //
    const { setMessage } = useContext(MessageContext);

    // -------------------------------------------------------------------------- //
    // Definicje dodatkowych stanów i kontekstów
    // -------------------------------------------------------------------------- //

    const [hovered, setHovered] = useState<boolean>(false);
    const [loadingApiData, setLoadingApiData] = useState<boolean>(false);

    // -------------------------------------------------------------------------- //
    // Change Handler
    // -------------------------------------------------------------------------- //

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    // -------------------------------------------------------------------------- //
    // Dodatkowe - Pobranie danych po NIP
    // -------------------------------------------------------------------------- //

    const getDataByNip = async () => {
        setLoadingApiData(true);
        getCompanyDataByNIP(formData).then((response_data:FormDataType) => {
            setFormData(response_data);
            setMessage({status: "success", text: "Pobranie dancyh po NIP zakończone sukcesem."});
            setLoadingApiData(false);
        }).catch(() => {
            setMessage({status: "error", text: "Nie udało się pobrać danych po NIP."}); 
            setLoadingApiData(false);    
        });
    };

    // -------------------------------------------------------------------------- //
    // Dodatkowe - Klasa CSS do hoover efektu pobrania danych po NIP
    // -------------------------------------------------------------------------- //

    const hoverGetByNipClass = hovered
        ? "inset-shadow-md inset-shadow-green-500 w-full"
        : "w-full";

    // -------------------------------------------------------------------------- //
    // Renderowanie danych
    // -------------------------------------------------------------------------- //

    return (
        <>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="NIP (opcja):"   
                    type = "text"
                    name="nip"
                    value={formData.nip ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/3 pe-2'
                    classNameInput='w-full'
                    placeholder = "nip"   
                    errors={formError?.nip ?? null}
                ></Input>
                <div className='flex justify-start items-end ps-2 pb-2 w-1/3'>
                    <Button
                    color="green"
                    className='flex items-center'
                    onMouseEnter={() => {setHovered(true);}}
                    onMouseLeave={() => {setHovered(false);}}
                    onClick={() => {getDataByNip()}}
                    disabled={loadingApiData || false}
                    >
                        {loadingApiData ? (
                            <div className="loader w-5 h-5 border-[3px] border-black dark:border-neutral-400"></div>
                            ):(
                            <LocateFixed size={20}/>
                        )}
                        {loadingApiData ? (
                            <span className='ps-2'>Pobieranie danych z API</span>
                        ):(
                            <span className='ps-2'>Pobierz dane po NIP</span>
                        )}
                    </Button>
                </div>
            </div>
            <Line text="Obowiązkowe"/>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Nazwa Skórcona:"   
                    type = "text"
                    name="name_short"
                    value={formData.name_short}
                    onChange={handleChange}
                    classNameContainer='w-1/3 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "nazwa skrócona"   
                    errors={formError?.name_short ?? null}
                    required
                ></Input>
                <Input
                    label="Nazwa Pełna:"   
                    type = "text"
                    name="name_complete"
                    value={formData.name_complete}
                    onChange={handleChange}
                    classNameContainer='w-2/3 ps-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "nazwa pełna"   
                    errors={formError?.name_complete ?? null}
                    required
                ></Input>
            </div>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Ulica:"   
                    type = "text"
                    name="street"
                    value={formData.street ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-3/4 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "ulica"   
                    errors={formError?.street ?? null}
                ></Input>
                <Input
                    label="Numer:"   
                    type = "text"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleChange}
                    classNameContainer='w-1/4 ps-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "nr"   
                    errors={formError?.house_number ?? null}
                    required
                ></Input>
            </div>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Miejscowość/Miasto:"   
                    type = "text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    classNameContainer='w-1/3 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "ulica"   
                    errors={formError?.city ?? null}
                    required
                ></Input>
                <Input
                    label="Kod Pocztowy:"   
                    type = "text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    classNameContainer='w-1/3 ps-2 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder ="kod pocztowy"   
                    errors={formError?.postal_code ?? null}
                    required
                ></Input>
                <Input
                    label="Poczta (Miejscowość):"   
                    type = "text"
                    name="postal_city"
                    value={formData.postal_city}
                    onChange={handleChange}
                    classNameContainer='w-1/3 ps-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "poczta"   
                    errors={formError?.postal_city ?? null}
                    required
                ></Input>
            </div>

            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Region:"   
                    type = "text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    classNameContainer='w-1/3 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "region (województwo)"   
                    errors={formError?.region ?? null}
                ></Input>
                <Input
                    label="Kraj:"   
                    type = "text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    classNameContainer='w-1/3 ps-2 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "kraj"   
                    errors={formError?.country ?? null}
                    required
                ></Input>
                <div className='flex justify-end items-end ps-2 py-2'>
                    <Button
                    color="teal"
                    className='flex items-center'
                    onClick={() => window.open(buildCompanyGoogleMapsUrl(formData), "_blank")}
                    >
                        <Map size={20}/>
                        <span className='ps-2'>Sprawdź w Google Maps</span>
                    </Button>
                </div>
            </div>
            <Line text="Opcjonalne - dane podatkowe"/>
            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="KRS (opcja):"   
                    type = "text"
                    name="krs"
                    value={formData.krs ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "krs"   
                    errors={formError?.krs ?? null}
                ></Input>
                <Input
                    label="REGON (opcja):"   
                    type = "text"
                    name="regon"
                    value={formData.regon ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 ps-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "regon"   
                    errors={formError?.regon ?? null}
                ></Input>
            </div>

            <Line text="Opcjonalne - dane do map"/>

            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Szerokość geograficzna:"   
                    type = "number"
                    name="latitude"
                    value={formData.latitude ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "szerokość geograficzna"   
                    errors={formError?.latitude ?? null}
                    step="0.0001"
                    min="-90"
                    max="90"
                ></Input>
                <Input
                    label="Długość geograficzna:"   
                    type = "number"
                    name="longitude"
                    value={formData.longitude ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 ps-2'
                    classNameInput={hoverGetByNipClass}
                    placeholder = "długość geograficzna"   
                    errors={formError?.longitude ?? null}
                    step="0.0001"
                    min="-180"
                    max="180"
                ></Input>
            </div>

            <div className='flex flex-row w-full flex-wrap'>
                <Input
                    label="Odległość do firmy [km]:"   
                    type = "number"
                    name="distance"
                    value={formData.distance ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 pe-2'
                    classNameInput='w-full'
                    placeholder = "odległość do firmy w km"   
                    errors={formError?.distance ?? null}
                    unit="km"
                    step="1"
                    min="0"
                    max="20000"
                ></Input>
                <Input
                    label="Czas dojazdu [h]:"   
                    type = "number"
                    name="distance_time"
                    value={formData.distance_time ?? ""}
                    onChange={handleChange}
                    classNameContainer='w-1/2 ps-2'
                    classNameInput='w-full'
                    placeholder = "czas dojazdu w godzinach"   
                    errors={formError?.distance_time ?? null}
                    unit="h"
                    step="0.5"
                    min="0"
                    max="48"
                ></Input>
            </div>
        </>
    );
}
