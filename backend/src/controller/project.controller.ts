import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { projectSchema } from "../../utils/types/zodSchema";
import { invalidateCache } from "../lib/cache";

const parseDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (typeof value !== "string") return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

export const listProjects = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const items = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listProjects failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const data = parsed.data;

  try {
    const created = await prisma.project.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        techStack: data.techStack ?? [],
        projectUrl: data.projectUrl || null,
        repoUrl: data.repoUrl || null,
        startDate: parseDate(data.startDate),
        endDate: parseDate(data.endDate),
        isVerified: false,
      },
    });
    invalidateCache(`student:detail:${userId}`);
    return res.status(201).json({ project: created });
  } catch (error) {
    logger.error({ error }, "createProject failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const parsed = projectSchema.partial().safeParse(req.body);
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
    const existing = await prisma.project.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.techStack !== undefined) updateData.techStack = data.techStack;
    if (data.projectUrl !== undefined) updateData.projectUrl = data.projectUrl || null;
    if (data.repoUrl !== undefined) updateData.repoUrl = data.repoUrl || null;
    if (data.startDate !== undefined) updateData.startDate = parseDate(data.startDate);
    if (data.endDate !== undefined) updateData.endDate = parseDate(data.endDate);

    updateData.isVerified = false;

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
    });
    invalidateCache(`student:detail:${userId}`);
    return res.status(200).json({ project: updated });
  } catch (error) {
    logger.error({ error }, "updateProject failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const existing = await prisma.project.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.project.delete({ where: { id } });
    invalidateCache(`student:detail:${userId}`);
    return res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    logger.error({ error }, "deleteProject failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
