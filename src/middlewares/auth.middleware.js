import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

const authMiddleware = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = cookieToken || bearerToken;

    if (!token) {
      throw new ApiError(401, "Authentication token is required");
    }

    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
