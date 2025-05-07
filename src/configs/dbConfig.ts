import mongoose from "mongoose";
import { errorLogger, infoLogger } from "../lib/utils/devLogger";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {});
    infoLogger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      errorLogger(`Error: ${error.message}`);
    } else {
      errorLogger(`Error: ${String(error)}`);
    }
    process.exit(1);
  }
};

export default connectDB;