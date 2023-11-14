import mongoose from "mongoose";
import debug from "debug";

export async function connect(): Promise<void> {
  const { MONGO_URI } = process.env;
  const debugMongo = debug("app:mongo");
  const debugMongoError = debug("app:mongo:error");

  if (!MONGO_URI) {
    debugMongo("Please provide DataBase URI to connect. exiting now...");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    debugMongo("Successfully connected to database");
  } catch (e) {
    debugMongoError("DataBase connection failed. exiting now...");
    process.exit(1);
  }
}
