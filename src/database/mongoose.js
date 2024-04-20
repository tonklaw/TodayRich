import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
