import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import env from "../config/env.js";

const securityMiddleware = [
  helmet(),

  cors({
    origin: env.clientUrl,
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
