import { useState,useEffect } from "react";
import { useMessage } from "@/providers/MessageProvider";

import axiosLaravelBackend from "@/api/axiosInstances/axiosLaravelBackend";
import type { ValidationErrorsType } from "@/api/response/types";


type Method = "get" | "post" | "put" | "delete";

type UseBackendOptions = {
  initialLoading?: boolean; // domyślnie false
};

type ErrorType = {
  type: "standard" | "authorization";
  text: string
};

type MutateOptions = {
  url?: string;
  data?: any;
  params?: URLSearchParams;
};

export const useBackend = <T>(
  method: Method,
  url: string,
  options?: UseBackendOptions
) => {
  
  const { setMessage } = useMessage();
  const [loading, setLoading] = useState<boolean>(
    options?.initialLoading ?? false
  );
  const [validationErrors, setValidationErrors] = useState<ValidationErrorsType>(null);
  const [error, setError] = useState<ErrorType | null>(null);

  const mutate = async ({ url: urlOverride, data, params }: MutateOptions = {}) => {
    setLoading(true);
    setValidationErrors(null);
    setError(null);

    let finalUrl = url;
    if(urlOverride)
    {
      finalUrl=urlOverride;
    }

    try {
      let res;
      switch (method) {
        case "get": res = await axiosLaravelBackend.get<T>(finalUrl, {params}); break;
        case "post": res = await axiosLaravelBackend.post<T>(finalUrl, data); break;
        case "put": res = await axiosLaravelBackend.put<T>(finalUrl, data); break;
        case "delete": res = await axiosLaravelBackend.delete<T>(finalUrl); break;
        default: throw new Error("Nieobsługiwana metoda HTTP");
      }

      const responseData = res.data as any;

      if (responseData?.text && responseData?.type == "message" && responseData?.status) {

        if(responseData?.type == "message")
        {
          setMessage({ text: responseData.text, status: responseData.status });
        } else {
          setError({type: "standard", text:responseData.text});
        }
      }

      setLoading(false);
      return res;
    } catch (err: any) {
      
      console.log(err);

      const validation_errors = (err.data as any)?.errors;
      if (validation_errors) 
      {
        setValidationErrors(validation_errors);
      }

      if ((err.data as any)?.text && (err.data as any)?.type && (err.data as any)?.status && !validation_errors) {
        switch ((err.data as any)?.type) {
          case "message":
            setMessage({ text: (err.data as any)?.text, status: (err.data as any)?.status });
            break;
          default:
            setError({type: "standard", text:(err.data as any)?.text});
            break;
        }
      } else {
        if(!validation_errors)
        {
          if (err?.status >= 500 && err?.status < 600) {
            setError({ type: "standard", text: "Błąd serwera." });
          } else {
            switch (err?.status) {
              case 401:
              case 403:
                setError({ type: "authorization", text: "Brak dostępu do zasobu." });
                break;
              case 404:
                setError({ type: "standard", text: "Nie znaleziono zasobu." });
                break;
              default:
                setError({ type: "standard", text: "Nieoczekiwany bład." });
                break;
            }
          }
        }
      }
    
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return { loading, validationErrors, error, mutate };
};