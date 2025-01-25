import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import http from "node:http";
import {config, formatResponse} from "../common";

export function registerHttpMiddleware(app: express.Express) {
  app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  morganBody(app);
  app.use(formatResponse);
}

export function registerHttpRoutes(app: express.Express) {
  const router = express.Router();
  app.use("/api", router);
}

export function runServer(server: http.Server) {
  server.listen(config.port, () => {
    console.log("SERVER LISTENING ON PORT", config.port);
  })
}
