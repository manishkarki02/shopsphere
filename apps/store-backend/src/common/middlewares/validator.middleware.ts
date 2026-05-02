import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, type ZodObject, z } from "zod/v4";
import { ApiError } from "@/common/utils/response.util";

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
const validatorMiddleware = (schema: ZodObject) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			const errors: { target: string; errors: string }[] = [];
			const result = await schema.safeParseAsync({
				params: req.params,
				query: req.query,
				body: req.body,
			});

			if (!result.success) {
				return next(
					new ApiError(httpStatus.BAD_REQUEST, {
						message: "Validation error",
						error: z.treeifyError(result.error),
					}),
				);
			}

			["params", "query", "body"].forEach((key) => {
				if (result.data[key]) {
					Object.defineProperty(req, key, {
						value: result.data[key],
						writable: true,
						configurable: true,
						enumerable: true,
					});
				}
			});

			if (errors.length > 0) {
				return next(
					new ApiError(httpStatus.BAD_REQUEST, {
						message: "Validation error",
						error: errors,
					}),
				);
			}
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return next(
					new ApiError(httpStatus.BAD_REQUEST, {
						message: "Validation error",
						error: z.treeifyError(error),
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
