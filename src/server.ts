//imports

import express from "express";
import logger from "morgan";
import cors from "cors";
import adminRoutes from "./backend/routes/api/Admin";

const app = express();

// CORS
const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

//Bringing in backend

require("./backend/config/db");

app.use(logger("dev"));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

/**
 * Routes:
 */

// Admin
app.use("/api/admins", adminRoutes);

// Put API routes here, before the "catch all" route
app.get("/api", (req, res) => {
  res.json({ message: "The API is alive" });
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
