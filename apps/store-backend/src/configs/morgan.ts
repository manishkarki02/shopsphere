import morgan from "morgan";
import logger from "@/configs/logger";
import Environment from "@/configs/env";

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
