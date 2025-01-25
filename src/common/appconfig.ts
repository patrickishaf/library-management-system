import dotenv from "dotenv";
import path from "node:path";
import { Optional } from "./util";

type NodeEnv = "development" | "production" | "test";

export interface AppConfig {
  port: string;
  nodeEnv: NodeEnv;
  dbUser: string;
  dbName: string;
  dbHost: string;
  dbPassword: string;
}

export const loadConfigFromNodeEnv = () => {
  const env: Optional<NodeEnv> = process.env.NODE_ENV as NodeEnv;
  if (!env || env === "production") {
    return dotenv.config();
  }
  const fileName = (env === "development") ? ".env.development" : (env === "test") ? ".env.test" : ".env"
  const pathToEnvFile = path.join(__dirname, '..', '..', fileName);
  dotenv.config({ path: pathToEnvFile });
}

export const getConfig = () => {
  loadConfigFromNodeEnv();
  const config: AppConfig = {
    port: process.env.PORT ?? "3000",
    nodeEnv: (process.env.NODE_ENV ?? "production") as NodeEnv,
    dbHost: process.env.DB_HOST!,
    dbName: process.env.DB_PASS!,
    dbPassword: process.env.DB_PASS!,
    dbUser: process.env.DB_USER!,
  }
  console.log({ config });
  return config;
}