const winston = require('winston');
const { format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

const formatLogger = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

const developmentTransports = [
    new winston.transports.Console({ format: format.combine(format.colorize(), formatLogger) }),
];

const productionTransports = [
    new winston.transports.Console({ format: formatLogger }),
    new DailyRotateFile({
        filename: 'logs/errors-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxFiles: '14d',
    }),
];

const logger = winston.createLogger({
    levels,
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transports: process.env.NODE_ENV === 'development' ? developmentTransports : productionTransports,
});

module.exports = logger;