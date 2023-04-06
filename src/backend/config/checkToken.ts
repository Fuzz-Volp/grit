// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// export const checkToken = (req: Request, res: Response, next: NextFunction) => {
//   let token = req.get("Authorization") || req.query.token;
//   if (token) {
//     token = token.replace("Bearer ", "");
//     jwt.verify(token, process.env.SECRET, function (err: Error, decoded: string) {
//       req.admin = err ? null : decoded.user;
//       req.exp = err ? null : new Date(decoded.exp * 1000);
//     });
//     return next();
//   } else {
//     req.admin = null;
//     return next();
//   }
// };
