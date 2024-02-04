import { config } from "dotenv";
config();
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  console.log(process.env.MONGO_DB_URL);
  try {
    const res = await mongoose.connect(process.env.MONGO_DB_URL);
    if (res) {
      console.log("Connected to database");
    }
  } catch (err) {
    console.log(err);
  }
};
