import mongoose from "mongoose";
import Environment from "@/configs/env";
import logger from "@/configs/logger";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(Environment.get("DATABASE_URL"));
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err);
});

export default connectDB;
