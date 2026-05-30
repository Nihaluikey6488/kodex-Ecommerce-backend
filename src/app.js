import "dotenv/config";

/**
 * This is file is setting the application of Express server
 */
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/auth.routes.js";
import productRoutes from "../src/routes/product.routes.js";
// Initialize Express Application
let app = express();
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser()); // Middleware to parse cookies
// Authentication routes
app.use("/api/auth", authRoutes);
// Product routes
app.use("/api", productRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  let statuscode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  console.error(err.stack);
  res.status(statuscode).json({ message: message });
});

// Export Configured app so we can use it in  other file
export default app;
