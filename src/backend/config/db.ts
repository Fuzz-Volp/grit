import mongoose from "mongoose";
import { mongoConfig } from "./config";
import Logging from "../../utils/Logging";
import { port } from "./config";

export const connected = mongoose
  .connect(mongoConfig.mongo.uri, { retryWrites: true, w: "majority" })
  .then(() => {
    const db = mongoose.connection;
    Logging.info(`Connected to ${db.name} at ${db.host}:${port}`);
  })
  .catch((error) => {
    Logging.error(error);
  });
