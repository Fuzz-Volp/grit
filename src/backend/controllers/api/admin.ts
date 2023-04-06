import { Request, Response, NextFunction } from "express";
import Admin from "../../models/admin";
import Logging from "../../../utils/Logging";

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
};

export const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    const foundAdmins = res.locals.data.admins;
    res.json(foundAdmins);
    console.log(foundAdmins);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.admin);
  },
};
