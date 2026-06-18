import jwt from "jsonwebtoken";
import env from "../config/env.js";

const tokenGenerate = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  );
};

export default tokenGenerate;
