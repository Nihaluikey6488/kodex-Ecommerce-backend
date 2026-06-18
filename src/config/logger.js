import pino from "pino";
import env from "./env.js";

const logger = pino({
  level: env.logLevel,
  transport:
    env.nodeEnv === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
});

export default logger;
