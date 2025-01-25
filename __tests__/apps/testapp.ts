import express from 'express';
import cors from 'cors';
import { formatResponse } from '../../src/common';
import { registerTerminationListeners } from '../../src/server';

const app = express();

app.use(cors({ origin: true }));
app.use(formatResponse);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  res.status(500).json(err);
})

app.get('/test', (_, res) => {
  res.status(200).json({ time: 'now' });
})
app.get('/test-error', (_, res) => {
  res.status(400).json({ reason: 'error' })
})

process.on('error', (err) => {
  console.error('ran into an uncaught error. error: ' + err.message);
})

process.on('uncaughtException', (err) => {
  console.error('ran into an uncaught exception. error: ' + err.message);
})

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('ran into an unhandled rejection. error:\n\n' + reason.message + '\n\n' + promise);
})

registerTerminationListeners(app);

export const testApp = app;
