// Imports

import { Request, Response, NextFunction } from "express";
import Admin from "../../models/admin";
import Logging from "../../../utils/Logging";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/config";

// functions
export const checkToken = (req: Request, res: Response) => {
  const { admin, exp } = req.params;
  console.log("req.admin", admin);
  res.json(exp);
};

export const dataController = {
  // Index: Get
  async indexAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const foundAdmins = await Admin.find({});
      res.locals.data.admins = foundAdmins;
      next();
    } catch (error) {
      res.status(400).json(error);
      Logging.error(error);
    }
  },
  // Delete: Delete
  async destroyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
      res.locals.data.admin = deletedAdmin;
      next();
    } catch (error) {
      res.status(400).json(error);
      Logging.error(error);
    }
  },
  // Update: Put
  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const updateAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.locals.data.admin = updateAdmin;
      next();
    } catch (error) {
      res.status(400).json(error);
      Logging.error(error);
    }
  },
  // Create: Post
  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const createAdmin = await Admin.create(req.body);
      res.locals.data.admin = createAdmin;
      next();
    } catch (error) {
      res.status(400).json(error);
      Logging.error(error);
    }
  },
  // Show: Get
  async showAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const foundAdmin = await Admin.findById(req.params.id);
      res.locals.data.admin = foundAdmin;
      next();
    } catch (error) {
      res.status(400).json(error);
      Logging.error(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) throw new Error();
      const match = await bcrypt.compare(req.body.password, admin.password);
      if (!match) throw new Error();
      res.locals.data.admin = admin;
      res.locals.data.token = createJWT(admin);
      next();
    } catch (error) {
      res.status(400).json("Bad Credentials");
      Logging.error(error);
    }
  },
};

export const apiController = {
  async index(req: Request, res: Response) {
    try {
      const foundAdmins = await res.locals.data.admins;
      res.json(foundAdmins);
      console.log(foundAdmins);
    } catch (error) {
      Logging.error(error);
    }
  },
  async show(req: Request, res: Response) {
    try {
      res.json(res.locals.data.admin);
    } catch (error) {
      Logging.error(error);
    }
  },
  async auth(req: Request, res: Response) {
    try {
      res.json(res.locals.data.token);
    } catch (error) {
      Logging.error(error);
    }
  },
};

/** -- Helper Function --  */

function createJWT(admin) {
  return jwt.sign({ admin }, SECRET, { expiresIn: "24h" });
}
