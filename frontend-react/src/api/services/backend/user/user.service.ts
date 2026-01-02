export const userService = {
  paths: {
    getAll: "/admin/users",
    getById: (id: string) => `/admin/user/${id}`,
    update: "/admin/users/update_permissions",
  },
};
