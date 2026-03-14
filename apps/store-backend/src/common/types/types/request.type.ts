import type { NextFunction, Request, Response } from "express";
import type { ZodObject, z } from "zod";

// Use this to type controllers with validated request shapes
export type ValidatedRequestHandler<T extends ZodObject<any>> = (
	req: Request<
		z.infer<T> extends { params: infer P } ? P : {},
		any,
		z.infer<T> extends { body: infer B } ? B : {},
		z.infer<T> extends { query: infer Q } ? Q : {}
	>,
	res: Response,
	next: NextFunction,
) => Promise<any>;
