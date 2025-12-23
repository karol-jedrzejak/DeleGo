export const companyService = {
  paths: {
    getAll: "/company",
    getById: (id: string) => `/company/${id}`,
    create: "/company",
    update: (id: string) => `/company/${id}`,
    deactivate: (id: string) => `/company/${id}`,
    restore: (id: string) => `/company/${id}/restore`,
    destroy: (id: string) => `/company/${id}/destroy`,
  },
};
