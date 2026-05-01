import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { achievementSchema } from "../../utils/types/zodSchema";
import { deleteByPublicId, extractPublicIdFromUrl } from "../lib/cloudinary";
import { invalidateCache } from "../lib/cache";

const invalidateForUser = (userId: number) => {
  invalidateCache(`student:detail:${userId}`);
  invalidateCache("admin:stats");
};

const parseDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (typeof value !== "string") return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

export const listAchievements = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const items = await prisma.achievement.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listAchievements failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createAchievement = async (req: Request, res: Response) => {
  const parsed = achievementSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const data = parsed.data;

  try {
    const created = await prisma.achievement.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        category: data.category,
        certificateUrl: data.certificateUrl,
        achievementDate: parseDate(data.achievementDate),
        isVerified: false,
      },
    });
    invalidateForUser(userId);
    return res.status(201).json({ achievement: created });
  } catch (error) {
    logger.error({ error }, "createAchievement failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAchievement = async (req: Request, res: Response) => {
  const parsed = achievementSchema.partial().safeParse(req.body);
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
    const existing = await prisma.achievement.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.certificateUrl !== undefined) updateData.certificateUrl = data.certificateUrl;
    if (data.achievementDate !== undefined) {
      updateData.achievementDate = data.achievementDate
        ? parseDate(data.achievementDate)
        : null;
    }

    updateData.isVerified = false;

    const updated = await prisma.achievement.update({
      where: { id },
      data: updateData,
    });
    invalidateForUser(userId);
    return res.status(200).json({ achievement: updated });
  } catch (error) {
    logger.error({ error }, "updateAchievement failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAchievement = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const existing = await prisma.achievement.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    if (existing.certificateUrl) {
      const publicId = extractPublicIdFromUrl(existing.certificateUrl);
      if (publicId) deleteByPublicId(publicId, "raw").catch(() => {});
    }

    await prisma.achievement.delete({ where: { id } });
    invalidateForUser(userId);
    return res.status(200).json({ message: "Achievement deleted" });
  } catch (error) {
    logger.error({ error }, "deleteAchievement failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
