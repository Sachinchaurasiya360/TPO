import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { internshipSchema } from "../../utils/types/zodSchema";
import { deleteByPublicId, extractPublicIdFromUrl } from "../lib/cloudinary";

const parseDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (typeof value !== "string") return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

export const listInternships = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const items = await prisma.internship.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listInternships failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createInternship = async (req: Request, res: Response) => {
  const parsed = internshipSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const data = parsed.data;

  const startDate = parseDate(data.startDate);
  if (!startDate) {
    return res.status(400).json({ message: "Invalid start date" });
  }
  const endDate = parseDate(data.endDate);

  try {
    const created = await prisma.internship.create({
      data: {
        userId,
        companyName: data.companyName,
        role: data.role,
        roleDescription: data.roleDescription,
        duration: data.duration,
        startDate,
        endDate,
        certificateUrl: data.certificateUrl,
        hrName: data.hrName,
        hrEmail: data.hrEmail || null,
        hrPhone: data.hrPhone,
        isVerified: false,
      },
    });
    return res.status(201).json({ internship: created });
  } catch (error) {
    logger.error({ error }, "createInternship failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateInternship = async (req: Request, res: Response) => {
  const parsed = internshipSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const { id } = req.params;
  const data = parsed.data;

  try {
    const existing = await prisma.internship.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const updateData: Record<string, unknown> = {};
    if (data.companyName !== undefined) updateData.companyName = data.companyName;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.roleDescription !== undefined) updateData.roleDescription = data.roleDescription;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.startDate !== undefined) {
      const d = parseDate(data.startDate);
      if (!d) return res.status(400).json({ message: "Invalid start date" });
      updateData.startDate = d;
    }
    if (data.endDate !== undefined) {
      updateData.endDate = data.endDate ? parseDate(data.endDate) : null;
    }
    if (data.certificateUrl !== undefined) updateData.certificateUrl = data.certificateUrl;
    if (data.hrName !== undefined) updateData.hrName = data.hrName;
    if (data.hrEmail !== undefined) updateData.hrEmail = data.hrEmail || null;
    if (data.hrPhone !== undefined) updateData.hrPhone = data.hrPhone;

    // Edits flip it back to unverified for faculty re-review
    updateData.isVerified = false;

    const updated = await prisma.internship.update({
      where: { id },
      data: updateData,
    });
    return res.status(200).json({ internship: updated });
  } catch (error) {
    logger.error({ error }, "updateInternship failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInternship = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const existing = await prisma.internship.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Internship not found" });
    }

    if (existing.certificateUrl) {
      const publicId = extractPublicIdFromUrl(existing.certificateUrl);
      if (publicId) deleteByPublicId(publicId, "raw").catch(() => {});
    }

    await prisma.internship.delete({ where: { id } });
    return res.status(200).json({ message: "Internship deleted" });
  } catch (error) {
    logger.error({ error }, "deleteInternship failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
