import { z } from "zod";

export const paginationRequestSchema = z.object({
  page: z.number().positive().optional(),
  limit: z.number().positive().optional(),
});

export const paginationResponseSchema = z.object({
  meta: z.object({
    totalCount: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export type PaginationRequest = z.infer<typeof paginationRequestSchema>;

export type PaginationResponse = z.infer<typeof paginationResponseSchema>;
