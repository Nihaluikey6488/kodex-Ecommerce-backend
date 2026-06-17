import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const securityMiddleware = [
  helmet(),

  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),

  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests, please try again later.",
    },
  }),
];

export default securityMiddleware;