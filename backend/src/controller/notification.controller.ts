import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";

export const listNotifications = async (req: Request, res: Response) => {
  const limitRaw = Number(req.query.limit ?? 30);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;
  const unreadOnly = req.query.unreadOnly === "true";

  try {
    const where: { userId: number; isRead?: boolean } = { userId: req.user!.id };
    if (unreadOnly) where.isRead = false;

    const [items, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      prisma.notification.count({
        where: { userId: req.user!.id, isRead: false },
      }),
    ]);

    return res.status(200).json({ items, unreadCount });
  } catch (error) {
    logger.error({ error }, "listNotifications failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const unreadCount = await prisma.notification.count({
      where: { userId: req.user!.id, isRead: false },
    });
    return res.status(200).json({ unreadCount });
  } catch (error) {
    logger.error({ error }, "getUnreadCount failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const result = await prisma.notification.updateMany({
      where: { id: req.params.id, userId: req.user!.id },
      data: { isRead: true },
    });
    if (result.count === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    logger.error({ error }, "markAsRead failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const result = await prisma.notification.updateMany({
      where: { userId: req.user!.id, isRead: false },
      data: { isRead: true },
    });
    return res.status(200).json({ ok: true, updated: result.count });
  } catch (error) {
    logger.error({ error }, "markAllAsRead failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const result = await prisma.notification.deleteMany({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (result.count === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    logger.error({ error }, "deleteNotification failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
