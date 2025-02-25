export const ApplicationSearchParams = Object.freeze({
  page: "page",
  userId: "userId",
});

export const ApplicationUrls = Object.freeze({
  home: "/",
  users: {
    index: "/users/",
    preview: (id: number) => `/users/${id}`,
    addAddress: (id: number, type: string) =>
      `/users/${id}/add-address/${type.toLowerCase()}`,
    editAddress: (id: number, type: string) =>
      `/users/${id}/edit-address/${type.toLowerCase()}`,
  },
});
