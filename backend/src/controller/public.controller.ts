import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";

export const listUpcomingEvents = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.event.findMany({
      where: {
        eventDate: { gte: new Date() },
        status: { notIn: ["CANCELLED", "COMPLETED"] },
      },
      orderBy: { eventDate: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        eventDate: true,
        eventTime: true,
        location: true,
        type: true,
        status: true,
      },
      take: 20,
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "public listUpcomingEvents failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
