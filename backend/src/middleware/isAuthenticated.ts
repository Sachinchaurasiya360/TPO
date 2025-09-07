import Jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function isAutheticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }
  try {
    const decode = Jwt.verify(token, process.env.JWTSECRET!);
    (req as any).user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
