import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import {
  updateDeptFacultySchema,
  userStatusSchema,
} from "../../utils/types/zodSchema";
import { Department } from "../../prisma/output/prismaclient";

const FACULTY_SELECT = {
  id: true,
  fullName: true,
  emailId: true,
  contactNo: true,
  department: true,
  isHOD: true,
  isVerified: true,
  isActive: true,
  createdAt: true,
};

const requireDept = (req: Request, res: Response): Department | null => {
  const dept = req.user?.department as Department | null | undefined;
  if (!dept) {
    res.status(400).json({ message: "HOD account has no department assigned." });
    return null;
  }
  return dept;
};

export const listDeptFaculty = async (req: Request, res: Response) => {
  const dept = requireDept(req, res);
  if (!dept) return;

  try {
    const items = await prisma.user.findMany({
      where: { role: "FACULTY", department: dept },
      orderBy: [{ isHOD: "desc" }, { fullName: "asc" }],
      select: FACULTY_SELECT,
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listDeptFaculty failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDeptFaculty = async (req: Request, res: Response) => {
  const dept = requireDept(req, res);
  if (!dept) return;

  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const parsed = updateDeptFacultySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { id, role: "FACULTY", department: dept },
    });
    if (!existing) {
      return res.status(404).json({ message: "Faculty not found in your department" });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: FACULTY_SELECT,
    });

    return res.status(200).json({ faculty: updated });
  } catch (error) {
    logger.error({ error }, "updateDeptFaculty failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setDeptFacultyStatus = async (req: Request, res: Response) => {
  const dept = requireDept(req, res);
  if (!dept) return;

  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const parsed = userStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (id === req.user!.id) {
    return res.status(400).json({ message: "You cannot change your own status." });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { id, role: "FACULTY", department: dept },
    });
    if (!existing) {
      return res.status(404).json({ message: "Faculty not found in your department" });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: parsed.data.isActive },
      select: FACULTY_SELECT,
    });

    return res.status(200).json({ faculty: updated });
  } catch (error) {
    logger.error({ error }, "setDeptFacultyStatus failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
