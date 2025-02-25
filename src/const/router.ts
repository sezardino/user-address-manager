export const ApplicationSearchParams = Object.freeze({
  page: "page",
  userId: "userId",
});

export const ApplicationUrls = Object.freeze({
  home: "/",
  users: {
    index: "/users/",
    preview: (id: string) => `/users/${id}`,
    addAddress: (id: string, type: string) =>
      `/users/${id}/add-address/${type.toLowerCase()}`,
    editAddress: (id: string, type: string) =>
      `/users/${id}/edit-address/${type.toLowerCase()}`,
  },
});
