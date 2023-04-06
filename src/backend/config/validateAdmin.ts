import { NextFunction, Request, Response } from "express";
import admin from "../models/admin";

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!admin) return res.status(401).json("Unauthorized)");
  next();
};
