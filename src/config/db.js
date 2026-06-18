import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    logger.info("MongoDB connected successfully");

    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connection established");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(err, "MongoDB connection error");
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
  } catch (error) {
    logger.fatal(error, "Failed to connect MongoDB");
    throw error;
  }
};

export default connectDb;
