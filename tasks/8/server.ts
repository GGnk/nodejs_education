import dotenv from "dotenv";
import * as database from "./config/database";
import express, { Express } from "express";

export async function bootstrap(): Promise<Express> {
  // use .env file to configure environment variables
  dotenv.config();
  // connect to database
  await database.connect();

  const app = express();

  app.use(express.json());

  return app;
}
