import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;
console.log("er1");

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}
console.log("er12");

export const connectToDatabase = async () => {
  console.log("databese connected");

  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
