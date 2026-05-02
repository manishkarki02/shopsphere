import z from "zod/v4";

export const paginationValidation = z.object({
    query: z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
    })
})