import { appLogger, createErrorResponse } from '../common';
import express from 'express';

export const handleErrors = () => {
  process.on('error', (err) => {
    appLogger.error('ran into an uncaught error. error: ' + err.message);
  })
}

export const handleUncaughtExceptions = () => {
  process.on('uncaughtException', (err) => {
    appLogger.error('ran into an uncaught exception. error: ' + err.message);
  })
}

export const handleRejections = () => {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    appLogger.error('ran into an unhandled rejection. error:\n\n' + reason.message + '\n\n' + promise);
  })
}

export const handleExpressErrors = (app: express.Express) => {
  app.use((err, req, res, next) => {
    res.status(500).json(err);
  })
}