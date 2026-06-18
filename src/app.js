import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import securityMiddleware from "./middlewares/security.middleware.js";

const app = express();

// Security middleware
app.use(securityMiddleware);

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.message;
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate resource already exists";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
