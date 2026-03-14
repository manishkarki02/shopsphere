import morgan from "morgan";
import Environment from "@/configs/env";
import logger from "@/configs/logger";

const stream = {
	write: (message: string) => {
		logger.info(message.trim());
	},
};

export const successHandler = morgan(
	Environment.get("NODE_ENV") === "development" ? "dev" : "combined",
	{
		skip: (_req, res) => res.statusCode >= 400,
		stream,
	},
);

export const errorHandler = morgan(
	Environment.get("NODE_ENV") === "development" ? "dev" : "combined",
	{
		skip: (_req, res) => res.statusCode < 400,
		stream,
	},
);
