
import type { ItemWithAddressType } from '@/models/Company.tsx';
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Search,Map } from "lucide-react";
import { Button ,Spinner } from '@/components';

// Utilities //

import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";
import { formatAddress } from "@/features/company/utilities/formatAddress";


type ButtonsProps = {
  company: ItemWithAddressType | undefined;
  size?: 1 | 2 | 3;
};

export const CompanyButtons = ({ company,size=2 }: ButtonsProps) => {
  return (
    <>
      {company ?
        (
        <div className={"flex flex-row items-center justify-center lg:justify-start gap-2"+(size==1 ? "" : size==2 ? " pb-2" : " pb-4")}>
          <Link to={ROUTES.COMPANY.SHOW.LINK(company.id)}>
            <Button
              color="sky"
              size={size==1 ? 1 : size==2 ? 2 : 3}
              className="flex flex-row items-center"
            >
              <Search size={size==1 ? 14 : size==2 ? 18 : 22} />
              <div className="ps-1">{company.names.name_short}</div>
            </Button>
          </Link>

          <Button
            color="teal"
            size={size==1 ? 1 : size==2 ? 2 : 3}
            className="flex flex-row items-center"
            onClick={() => window.open(buildCompanyGoogleMapsUrl(company.address), "_blank")}
          >
            <Map size={size==1 ? 14 : size==2 ? 18 : 22} />
            <div className="ps-1">{formatAddress(company.address)}</div>
          </Button>
        </div>
        ) :(
          <>
            <Spinner/>
          </>
        )
      }
    </>
  );
};
