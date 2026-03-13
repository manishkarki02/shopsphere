import winston from "winston";
import Environment from "@/configs/env";

const enumeratedErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: Environment.get("NODE_ENV") === "development" ? "debug" : "info",
    format: winston.format.combine(
        enumeratedErrorFormat(),
        winston.format.timestamp(),
        winston.format.splat(),
        Environment.get("NODE_ENV") === "development"
            ? winston.format.combine(
                  winston.format.colorize(),
                  winston.format.printf(
                      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`,
                  ),
              )
            : winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

export default logger;
