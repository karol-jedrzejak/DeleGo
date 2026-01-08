import type { CompanyAddress } from "@/models/Company";

export function formatAddress(formData: CompanyAddress ): string {
  // brak ulicy
  if (!formData.street) {
    return `${formData.city} ${formData.house_number}; ${formData.postal_code} ${formData.postal_city}, ${formData.country}`;
  }

  // Miasto i poczta to samo
  if (formData.city === formData.postal_city) {
    return `Ul. ${formData.street} ${formData.house_number}; ${formData.postal_code} ${formData.postal_city}, ${formData.country}`;
  }

  // Miasto i poczta różne
  return `Ul. ${formData.street} ${formData.house_number} ${formData.city}; ${formData.postal_code} ${formData.postal_city}, ${formData.country}`;
}