import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Role } from "../../prisma/output/prismaclient";
import prisma from "../lib/prisma";

export interface AuthPayload {
  id: number;
  role: Role;
  emailId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload & {
        department?: string | null;
        isHOD?: boolean;
      };
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        role: true,
        emailId: true,
        department: true,
        isHOD: true,
        isVerified: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Account is inactive or not found." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Account not yet verified by admin." });
    }

    req.user = {
      id: user.id,
      role: user.role,
      emailId: user.emailId,
      department: user.department,
      isHOD: user.isHOD,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

export const hasRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden. Insufficient permissions." });
    }
    next();
  };
};

export const isStudent = hasRole("STUDENT");
export const isAlumni = hasRole("ALUMNI");
export const isFaculty = hasRole("FACULTY");
export const isAdmin = hasRole("ADMIN");
export const isFacultyOrAdmin = hasRole("FACULTY", "ADMIN");

export const isHOD = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  if (req.user.role !== "FACULTY" || !req.user.isHOD) {
    return res.status(403).json({ error: "Forbidden. HOD access only." });
  }
  next();
};
