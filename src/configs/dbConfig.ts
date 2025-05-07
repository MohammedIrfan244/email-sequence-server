import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorLogger, infoLogger } from "../lib/utils/devLogger";

dotenv.config(); 

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {});
    isConnected = true;
    infoLogger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    if (error instanceof Error) {
      errorLogger(`MongoDB Error: ${error.message}`);
    } else {
      errorLogger(`MongoDB Error: ${String(error)}`);
    }
    process.exit(1);
  }
};

export default connectDB;
