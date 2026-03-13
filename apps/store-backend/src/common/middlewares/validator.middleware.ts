import { ApiError } from "@/common/utils/response.util";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, type AnyZodObject } from "zod";

/**
 * Generic Zod validation middleware.
 *
 * @example
 * const schema = z.object({
 *   params: z.object({ id: z.string() }),
 *   body: z.object({ name: z.string().min(2) }),
 *   query: z.object({ page: z.coerce.number().default(1) }),
 * });
 *
 * router.post("/:id", validatorMiddleware(schema), controller.handler);
 */
const validatorMiddleware = (schema: AnyZodObject) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync({
                params: req.params,
                query: req.query,
                body: req.body,
            });

            if (!result.success) {
                return next(
                    new ApiError(httpStatus.BAD_REQUEST, {
                        message: "Validation error",
                        error: result.error.flatten(),
                    }),
                );
            }

            // Replace req data with parsed (transformed/defaulted) values
            if (result.data.params) req.params = result.data.params;
            if (result.data.query) req.query = result.data.query;
            if (result.data.body) req.body = result.data.body;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(httpStatus.BAD_REQUEST, {
                        message: "Validation error",
                        error: error.flatten(),
                    }),
                );
            }
            return next(
                new ApiError(httpStatus.BAD_REQUEST, {
                    message: "Unexpected validation error",
                }),
            );
        }
    };
};

export default validatorMiddleware;
