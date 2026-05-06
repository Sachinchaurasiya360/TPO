import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { updateMarksSchema } from "../../utils/types/zodSchema";
import {
  computeDiff,
  upsertVerificationRequest,
  getPendingVerification,
} from "../lib/verification";
import { uploadBuffer, deleteByPublicId, extractPublicIdFromUrl } from "../lib/cloudinary";

const NUMERIC_FIELDS = [
  "sscPercentage",
  "hscPercentage",
  "diplomaPercentage",
  "sem1",
  "sem2",
  "sem3",
  "sem4",
  "sem5",
  "sem6",
  "sem7",
  "sem8",
] as const;

const MARKSHEET_FIELDS = [
  "sscMarksheetUrl",
  "hscMarksheetUrl",
  "diplomaMarksheetUrl",
  "sem1MarksheetUrl",
  "sem2MarksheetUrl",
  "sem3MarksheetUrl",
  "sem4MarksheetUrl",
  "sem5MarksheetUrl",
  "sem6MarksheetUrl",
  "sem7MarksheetUrl",
  "sem8MarksheetUrl",
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

export const uploadMarksheet = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { field } = req.params;
  if (!MARKSHEET_FIELDS.includes(field as any)) {
    return res.status(400).json({ message: "Invalid field" });
  }

  const userId = req.user!.id;
  try {
    const current = await ensureMarksRow(userId);

    const result = await uploadBuffer(req.file.buffer, {
      folder: "tpo/marksheets",
      resourceType: "raw",
      publicId: `marksheet-${field}-user-${userId}`,
    });

    await prisma.marks.update({
      where: { userId },
      data: { [field]: result.secure_url },
    });

    // Note: We don't verify marksheets through the same diff system yet, 
    // but the marks row has isVerified. Usually marksheet uploads should 
    // also trigger a verification request or set isVerified to false.
    await prisma.marks.update({
      where: { userId },
      data: { isVerified: false }
    });

    const oldUrl = (current as any)[field];
    if (oldUrl && oldUrl !== result.secure_url) {
      const oldPublicId = extractPublicIdFromUrl(oldUrl);
      if (oldPublicId && oldPublicId !== result.public_id) {
        deleteByPublicId(oldPublicId, "raw").catch(() => {});
      }
    }

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    logger.error({ error }, "uploadMarksheet failed");
    return res.status(500).json({ message: "Upload failed" });
  }
};
