import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { certificateSchema } from "../../utils/types/zodSchema";
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

export const listCertificates = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const items = await prisma.certificate.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listCertificates failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createCertificate = async (req: Request, res: Response) => {
  const parsed = certificateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.user!.id;
  const data = parsed.data;

  try {
    const created = await prisma.certificate.create({
      data: {
        userId,
        title: data.title,
        issuingOrg: data.issuingOrg,
        issueDate: parseDate(data.issueDate),
        expiryDate: parseDate(data.expiryDate),
        credentialId: data.credentialId,
        credentialUrl: data.credentialUrl,
        certificateUrl: data.certificateUrl,
        isVerified: false,
      },
    });
    invalidateForUser(userId);
    return res.status(201).json({ certificate: created });
  } catch (error) {
    logger.error({ error }, "createCertificate failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  const parsed = certificateSchema.partial().safeParse(req.body);
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
    const existing = await prisma.certificate.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.issuingOrg !== undefined) updateData.issuingOrg = data.issuingOrg;
    if (data.credentialId !== undefined) updateData.credentialId = data.credentialId;
    if (data.credentialUrl !== undefined) updateData.credentialUrl = data.credentialUrl;
    if (data.certificateUrl !== undefined) updateData.certificateUrl = data.certificateUrl;
    
    if (data.issueDate !== undefined) {
      updateData.issueDate = data.issueDate ? parseDate(data.issueDate) : null;
    }
    if (data.expiryDate !== undefined) {
      updateData.expiryDate = data.expiryDate ? parseDate(data.expiryDate) : null;
    }

    updateData.isVerified = false;

    const updated = await prisma.certificate.update({
      where: { id },
      data: updateData,
    });
    invalidateForUser(userId);
    return res.status(200).json({ certificate: updated });
  } catch (error) {
    logger.error({ error }, "updateCertificate failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const existing = await prisma.certificate.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (existing.certificateUrl) {
      const publicId = extractPublicIdFromUrl(existing.certificateUrl);
      if (publicId) deleteByPublicId(publicId, "raw").catch(() => {});
    }

    await prisma.certificate.delete({ where: { id } });
    invalidateForUser(userId);
    return res.status(200).json({ message: "Certificate deleted" });
  } catch (error) {
    logger.error({ error }, "deleteCertificate failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
