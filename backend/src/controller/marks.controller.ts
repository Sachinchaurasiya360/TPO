import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { updateMarksSchema } from "../../utils/types/zodSchema";
import {
  computeDiff,
  upsertVerificationRequest,
  getPendingVerification,
} from "../lib/verification";

const NUMERIC_FIELDS = [
  "sscPercentage",
  "hscPercentage",
  "sem1",
  "sem2",
  "sem3",
  "sem4",
  "sem5",
  "sem6",
  "sem7",
  "sem8",
] as const;

const ensureMarksRow = async (userId: number) => {
  const existing = await prisma.marks.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.marks.create({ data: { userId } });
};

export const getMarks = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const [marks, pending] = await Promise.all([
      ensureMarksRow(userId),
      getPendingVerification(userId, "MARKS"),
    ]);
    return res.status(200).json({ marks, pendingVerification: pending });
  } catch (error) {
    logger.error({ error }, "getMarks failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMarks = async (req: Request, res: Response) => {
  const parsed = updateMarksSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const payload = parsed.data as Record<string, unknown>;

  try {
    const current = await ensureMarksRow(userId);

    const incomingNumeric: Record<string, unknown> = {};
    for (const f of NUMERIC_FIELDS) {
      if (f in payload && payload[f] !== undefined) {
        incomingNumeric[f] = payload[f];
      }
    }

    const diff = computeDiff(
      current as unknown as Record<string, unknown>,
      incomingNumeric,
      [...NUMERIC_FIELDS]
    );

    const verification = await upsertVerificationRequest({
      userId,
      entityType: "MARKS",
      diff,
    });

    const [marks, pending] = await Promise.all([
      prisma.marks.findUnique({ where: { userId } }),
      getPendingVerification(userId, "MARKS"),
    ]);

    return res.status(200).json({
      marks,
      pendingVerification: pending,
      appliedFields: [],
      pendingFieldCount: verification.pendingCount,
    });
  } catch (error) {
    logger.error({ error }, "updateMarks failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
