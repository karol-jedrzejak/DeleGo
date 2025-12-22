export const nominatim = {
  paths: {
    getGeocodeAddress: (address: string) => `https://nominatim.openstreetmap.org/search?addressdetails=1&format=jsonv2&q=${address}&limit=1`,
  },
};
