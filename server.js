import "dotenv/config";

import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";

const startServer = async () => {
  try {
    await connectDb();

    const server = app.listen(env.port, () => {
      logger.info(`Server is running on port ${env.port}`);
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT received. Closing HTTP server.");
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Closing HTTP server.");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    logger.error(error, "Error starting server");
    process.exit(1);
  }
};

startServer();
