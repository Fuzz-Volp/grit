import mongoose from "mongoose";
import { config } from "./config";
import Logging from "../../utils/Logging";

const port = process.env.PORT || 3001;

export const connected = mongoose
  .connect(config.mongo.uri, { retryWrites: true, w: "majority" })
  .then(() => {
    const db = mongoose.connection;
    Logging.info(`Connected to ${db.name} at ${db.host}:${port}`);
  })
  .catch((error) => {
    Logging.error(error);
  });
