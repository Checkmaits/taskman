import { connect } from "mongoose";

export function connectToMongoDB(callback) {
  connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log("[Taskman]: Successfully connected to MongoDB...");
      callback();
    })
    .catch((error) => console.error(`[Taskman]: Failed to connect to MongoDB: ${error.message}`));
}
