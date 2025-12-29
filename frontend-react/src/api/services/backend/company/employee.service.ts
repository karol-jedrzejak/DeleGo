export const employeeService = {
  paths: {
    getAll: (parent_id: string) => `/company/${parent_id}/employee`,
    getById: (id: string) => `/employee/${id}`,
    create: (parent_id: string) => `company/${parent_id}/employee`,
    update: (id: string) => `/employee/${id}`,
    deactivate: (id: string) => `/employee/${id}`,
    restore: (id: string) => `/employee/${id}/restore`,
    destroy: (id: string) => `/employee/${id}/destroy`,
  },
};
