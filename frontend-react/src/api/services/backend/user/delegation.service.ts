export const delegationService = {
  paths: {
    getAll: "/delegation",
    getById: (id: string) => `/delegation/${id}`,
    getPdf: (id: string) => `/delegation/${id}/pdf`,
    create: "/delegation",
    update: (id: string) => `/delegation/${id}`,
    destroy: (id: string) => `/delegation/${id}`,
    getTripOptions: "/delegation/trip_options",
    getBillOptions: "/delegation/bill_options",
  },
};
