import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "./config";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET);
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    res.status(401).send("Please Authenticate");
  }
};
