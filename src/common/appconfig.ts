import dotenv from "dotenv";

export interface AppConfig {
  nodeEnv: string;
  dbUser: string;
  dbName: string;
  dbHost: string;
  dbPassword: string;
}