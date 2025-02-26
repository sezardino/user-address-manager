import { DEFAULT_PAGE_NUMBER } from "@/const/pagination";
import { PaginationResponse } from "@/schemas/pagination";

type Response = {
  meta: PaginationResponse["meta"];
  offset: number;
};

export const getPaginationData = (
  total: number,
  page: number,
  limit: number
): Response => {
  if (total === 0) {
    return {
      offset: 0,
      meta: {
        limit,
        page: DEFAULT_PAGE_NUMBER,
        totalCount: 0,
        totalPages: 0,
      },
    };
  }

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.min(page, totalPages);

  const offset = (currentPage - 1) * limit;

  return {
    offset,
    meta: {
      limit,
      page: currentPage,
      totalCount: total,
      totalPages,
    },
  };
};
