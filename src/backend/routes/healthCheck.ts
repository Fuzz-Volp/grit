import express from "express";
const router = express.Router();
import Logging from "../../utils/Logging";

export const healthcheck = () => {
  // healthCheck
  router.get("/check", (req, res, next) =>
    res.status(200).json({ message: "Full Send" })
  );

  // Error Handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });
};
