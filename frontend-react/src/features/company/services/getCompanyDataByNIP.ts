import axios from "axios";
import type { FormDataType as CompanyFormData } from "@/models/Company";
import { capitalizePolish } from "@/features/company/utilities/capitalizePolish";
import { parsePolishAddress } from "@/features/company/utilities/parsePolishAddress";
import { rejestrWL } from "@/api/services/companyData/rejestrWL.service";
import { nominatim } from "@/api/services/geoCoding/nominatim.service";

type ApiResponse = Promise<CompanyFormData>;

export async function getCompanyDataByNIP(formData: CompanyFormData): ApiResponse {

  // Rejestr Podatników API
  const today = new Date();
  let formattedDate =  today.toISOString().split("T")[0];

  let newData: CompanyFormData = {...formData};
  let address = null;

  try {
    const response = await axios.get(rejestrWL.paths.getDataByNip(formData.nip ?? "",formattedDate));
    address = response.data.result.subject.workingAddress;
    newData.name_complete = capitalizePolish(response.data.result.subject.name) || formData.name_complete;
    newData.name_short = capitalizePolish(response.data.result.subject.name) || formData.name_short;
    newData.regon = response.data.result.subject.regon;
    newData.krs = response.data.result.subject.krs;
  } catch (err) {
    throw err;
  }

  // Open Maps
  try {
    const response = await axios.get(nominatim.paths.getGeocodeAddress(address));
    let om_data = response.data[0];
    newData.country = om_data.address.country;

    if(om_data.address.country == "Polska") {
      let region = om_data.address.state;
      let wojewodztwo = region.split(' ');
      newData.region = wojewodztwo[1].charAt(0).toUpperCase() + wojewodztwo[1].slice(1);
    } else {
      newData.region = om_data.address.state;
    }

    let lat = parseFloat(om_data.lat).toFixed(4);
    let lon = parseFloat(om_data.lon).toFixed(4);

    newData.latitude = parseFloat(lat);
    newData.longitude = parseFloat(lon);

  } catch (err) {
    throw err;
  }

  const parsedAddress = parsePolishAddress(address ?? "");
  newData.postal_code = capitalizePolish(parsedAddress.postalCode) || formData.postal_code;
  newData.postal_city = capitalizePolish(parsedAddress.postOffice) || formData.postal_city;
  newData.street = capitalizePolish(parsedAddress.street) || formData.street;
  newData.house_number = capitalizePolish(parsedAddress.houseNumber) || formData.house_number;
  newData.city = capitalizePolish(parsedAddress.city) || formData.city;

  return newData;
}
