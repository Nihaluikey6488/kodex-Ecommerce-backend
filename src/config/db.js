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


















//  Use structured logging (Pino) instead of console.log

// Add MongoDB connection event handlers

//  Separate startup concerns from DB connection logic

//  Fail fast on database connection errors






// import mongoose from 'mongoose' // Importing mongoose Library for Mongodb connectino
// import env from './env.js'

// // Function to connect database
// async function connectDb(){
    
//     try {
//         // Connect MongoDB using connection string from .env file
//         await mongoose.connect(env.mongoUri)
//            // Print success message if database connected
//         console.log("MongoDb connected successfully")
//     } catch (error) {
//         // Print error message if connection fails
//         console.log("Error in MongoDb connection",error)
//         throw error
//     }
// }

// export default connectDb;
