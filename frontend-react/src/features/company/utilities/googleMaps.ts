import type { CompanyAddress  } from "@/models/Company";

export function buildCompanyGoogleMapsUrl(
  address_object: CompanyAddress 
): string {
  const {
    street,
    house_number,
    city,
    postal_code,
    postal_city,
  } = address_object;

  let address = "";

  if (!street) {
    address = `${city} ${house_number} ${postal_code} ${postal_city}`;
  } else if (city === postal_city) {
    address = `ul. ${street} ${house_number} ${postal_code} ${postal_city}`;
  } else {
    address = `ul. ${street} ${house_number} ${city} ${postal_code} ${postal_city}`;
  }

  return `https://www.google.pl/maps/place/${encodeURIComponent(address)}`;
}
