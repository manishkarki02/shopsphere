import type { Request, RequestHandler } from "express";

/*
 * @example
 * import { z } from "zod";
 * const loginSchema = z.object({
 *  body: z.object({
 *  email: z.string().email(),
 *  password: z.string().min(8),
 *  })
 * });
 *
 * type LoginSchema = z.infer<typeof loginSchema>;
 * export const loginController: ValidatedRequestHandler<LoginSchema> = async (req, res) => {}
 *
 */
export type ValidatedRequestHandler<
	TSchema extends { params?: any; body?: any; query?: any } = {
		params?: any;
		body?: any;
		query?: any;
	},
	TResponse = any,
> = RequestHandler<
	TSchema["params"] extends object ? TSchema["params"] : Request["params"],
	TResponse,
	TSchema["body"] extends object ? TSchema["body"] : Request["body"],
	TSchema["query"] extends object ? TSchema["query"] : Request["query"]
>;
