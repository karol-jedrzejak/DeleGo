export const carService = {
  paths: {
    getAll: "/car",
    getById: (id: string) => `/car/${id}`,
    create: "/car",
    update: (id: string) => `/car/${id}`,
    deactivate: (id: string) => `/car/${id}`,
    restore: (id: string) => `/car/${id}/restore`,
    destroy: (id: string) => `/car/${id}/destroy`,
  },
};
