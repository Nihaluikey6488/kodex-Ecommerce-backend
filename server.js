import "dotenv/config";

import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import env from "./src/config/env.js";
import Logger from "./src/config/logger.js";

const startServer = async () => {
  try {
    await connectDb();

    const server = app.listen(env.port, () => {
      Logger.info(`Server is running on port ${env.port}`);
    });
    

    process.on("SIGINT", () => {
      Logger.info("SIGINT signal received: closing HTTP server");
      server.close(() => process.exit(0));   // Exit the process after closing the server
    });
}  catch (error) {
    Logger.error("Error starting server:", error);
    process.exit(1); // Exit the process with an error code
  }
};



  startServer();





























// import "dotenv/config";


// /**
//  * This file is responsible for starting the server and listening on a specific port. It imports the configured Express application from app.js and starts the server.
//  */
// // Importing the configured express application from app.js

// import app from "./src/app.js";
// import connectDb from "./src/config/db.js";
// import env from "./src/config/env.js";
// // Load Envirment variables from .env file

// await connectDb(); // Connect to the database before starting the server
// // set the port to listen on, either from environment variable or default to 4000
// let port = env.port;

// // Starting Express server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
