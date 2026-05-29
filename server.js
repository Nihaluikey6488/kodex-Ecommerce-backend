/**
 * This file is responsible for starting the server and listening on a specific port. It imports the configured Express application from app.js and starts the server.
 */
// Importing the configured express application from app.js
import dotenv from 'dotenv' 

import app from "./src/app.js";
import connectDb from './src/config/db.js';
// Load Envirment variables from .env file
dotenv.config() 
await connectDb()// Connect to the database before starting the server
// set the port to listen on, either from environment variable or default to 4000
let port=process.env.PORT 

// Starting Express server
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`) 
})