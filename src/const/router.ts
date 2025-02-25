export const ApplicationSearchParams = Object.freeze({
  page: "page",
  userId: "userId",
});

export const ApplicationUrls = Object.freeze({
  home: "/",
  users: {
    index: "/users/",
    preview: (id: string) => `/users/${id}`,
    addAddress: (id: string) => `/users/${id}/add-address/`,
  },
});
