import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    // console.log("Connected to ", db.connection.collections);
  } catch (error) {
    console.log("error", error);
  }
}
