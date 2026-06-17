import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(4000),

  MONGO_URI: z.string().min(1, "MONGO_URI is required"),

  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),

  JWT_EXPIRES_IN: z.string().default("1h"),

  COOKIE_MAX_AGE: z.coerce.number().default(60 * 60 * 1000),

  IMAGEKIT_URL_ENDPOINT: z
    .string()
    .url("IMAGEKIT_URL_ENDPOINT must be a valid URL"),

  IMAGEKIT_PUBLIC_KEY: z.string().min(1),

  IMAGEKIT_PRIVATE_KEY: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

const env = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  mongoUri: parsedEnv.data.MONGO_URI,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  jwtExpiresIn: parsedEnv.data.JWT_EXPIRES_IN,
  cookieMaxAge: parsedEnv.data.COOKIE_MAX_AGE,
  imageKit: {
    urlEndpoint: parsedEnv.data.IMAGEKIT_URL_ENDPOINT,
    publicKey: parsedEnv.data.IMAGEKIT_PUBLIC_KEY,
    privateKey: parsedEnv.data.IMAGEKIT_PRIVATE_KEY,
  },
};

export default env;