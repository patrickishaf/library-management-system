import express from "express";
import http from "node:http";
import {registerHttpMiddleware, registerHttpRoutes, runServer} from "./httpconfig";
import { loadConfigFromNodeEnv } from "common";

const app = express();
const httpServer = http.createServer(app);

export function bootstrapApplication() {
  loadConfigFromNodeEnv();
  registerHttpMiddleware(app);
  registerHttpRoutes(app);
  runServer(httpServer);
}