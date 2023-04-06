import { validateAdmin } from "../../config/validateAdmin";
import {
  apiController,
  dataController,
  checkToken,
} from "../../controllers/api/admin";

import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.data = {};
  next();
});

//Routes:

// Index: api/admins
router.get("/", dataController.indexAdmin, apiController.index);

// Delete: api/admins/:id
router.delete("/:id", dataController.destroyAdmin, apiController.show);

// Update: api/admins/:id
router.put("/:id", dataController.updateAdmin, apiController.show);

// Create: api/admins
router.post("/", dataController.createAdmin, apiController.show);

// Show: api/admins/:id
router.get("/:id", dataController.showAdmin, apiController.show);

//Login: api/admins/login
router.post("/login", dataController.login, apiController.auth);

//Check Token: api/admins/check-token
router.get("/check-token", validateAdmin, checkToken);

export = router;
