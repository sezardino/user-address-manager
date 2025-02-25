export const ApplicationSearchParams = Object.freeze({
  page: "page",
  userId: "userId",
});

export const ApplicationUrls = Object.freeze({
  home: "/",
  users: {
    index: "/users/",
    addAddress: (id: string) => `/users/add/${id}`,
  },
});
