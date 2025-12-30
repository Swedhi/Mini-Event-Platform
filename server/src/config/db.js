import mongoose from "mongoose";

// Single ES-module style connection helper used by src/index.js
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not set in environment");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000
  });

  console.log("MongoDB connected");
};