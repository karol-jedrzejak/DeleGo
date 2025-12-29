
import type { ItemType } from '@/models/Company.tsx';
import { Link } from "react-router-dom"

import { ROUTES } from "@/routes/Routes.tsx";

// Komponenty UI //

import { Search,Map } from "lucide-react";
import { Button } from '@/components';

// Utilities //

import { buildCompanyGoogleMapsUrl } from "@/features/company/utilities/googleMaps";
import { formatAddress } from "@/features/company/utilities/formatAddress";


type ButtonsProps = {
  company: ItemType | undefined;
};

export const Buttons = ({ company }: ButtonsProps) => {
  return (
    <>
      {company ?
        (
        <div className="flex flex-row items-center justify-center lg:justify-start gap-2 pb-2">
          <Link to={ROUTES.COMPANY.SHOW.LINK(company.id)}>
            <Button
              color="sky"
              size={2}
              className="flex flex-row items-center"
            >
              <Search size={18} />
              <div className="ps-1">{company.name_short}</div>
            </Button>
          </Link>

          <Button
            color="teal"
            size={2}
            className="flex flex-row items-center"
            onClick={() => window.open(buildCompanyGoogleMapsUrl(company), "_blank")}
          >
            <Map size={18} />
            <div className="ps-1">{formatAddress(company)}</div>
          </Button>
        </div>
        ) :(
          <>
            <div className="loader w-5 h-5 border-[3px] border-(--app_color_second) dark:border-(--app_color_first) pb-2"></div>
          </>
        )
      }
    </>
  );
};
