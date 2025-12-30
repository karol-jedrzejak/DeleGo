export const delegationService = {
  paths: {
    getAll: "/delegation",
    getById: (id: string) => `/delegation/${id}`,
    create: "/delegation",
    update: (id: string) => `/delegation/${id}`,
    destroy: (id: string) => `/delegation/${id}`,
  },
};
