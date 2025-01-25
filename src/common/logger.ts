import winston from 'winston';

const {combine, timestamp, json} = winston.format

export const appLogger = winston.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.Console({ level: 'error' }),
  ],
});
