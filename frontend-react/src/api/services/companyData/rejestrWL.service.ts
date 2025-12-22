export const rejestrWL = {
  paths: {
    getDataByNip: (nip: string, date: string) => `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${date}`,
  },
};
