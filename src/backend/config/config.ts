import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

export const SECRET: Secret = process.env.SECRET || "";

const portConfig = process.env.PORT || 3001;

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.k6nwrgm.mongodb.net/grit`;

export const mongoConfig = {
  mongo: {
    uri: MONGO_URI,
  },
};

export const port = {
  port: {
    var: portConfig,
  },
};
