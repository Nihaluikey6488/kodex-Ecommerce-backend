import pino from 'pino';

const Logger = pino({
    level: env.LOG_LEVEL || "info",
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
        },
    },
});

export default Logger;