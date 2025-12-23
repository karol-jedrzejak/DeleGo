export const carService = {
  paths: {
    getAll: "/car",
    getById: (id: string) => `/car/${id}`,
    create: "/car",
    update: (id: string) => `/car/${id}`,
    delete: (id: string) => `/car/${id}`,
  },
};
