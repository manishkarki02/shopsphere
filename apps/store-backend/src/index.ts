import app from "./app";
import connectDB from "@/configs/db";
import Environment from "@/configs/env";
import logger from "@/configs/logger";

const startServer = async () => {
    // Connect to MongoDB
    await connectDB();

    const server = app.listen(Environment.get("PORT"), () => {
        logger.info(`Server listening on port ${Environment.get("PORT")}`);
    });

    // Graceful shutdown
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                logger.info("Server closed");
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error: Error) => {
        logger.error(error);
        exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
        logger.info("SIGTERM received");
        if (server) server.close();
        process.exit(0);
    });
};

startServer();
