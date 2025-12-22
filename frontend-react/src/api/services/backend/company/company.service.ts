export const companyService = {
  paths: {
    getAll: "/company",
    getById: (id: string) => `/company/${id}`,
    create: "/company",
    update: (id: string) => `/company/${id}`,
    delete: (id: string) => `/company/${id}`,
  },
};
