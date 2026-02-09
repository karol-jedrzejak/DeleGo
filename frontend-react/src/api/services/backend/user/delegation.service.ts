export const delegationService = {
  paths: {
    getAll: "/delegation",
    getById: (id: string) => `/delegation/${id}`,
    getPdf: (id: string) => `/delegation/${id}/pdf`,
    create: "/delegation",
    update: (id: string) => `/delegation/${id}`,
    changeStatus: (id: string) => `/delegation/${id}/change_status`,
    destroy: (id: string) => `/delegation/${id}`,
    getOptions: "/delegation/options",
    getStatusList: "/delegation/status_list",
  },
};
