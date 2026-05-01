import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { eventSchema, updateEventSchema } from "../../utils/types/zodSchema";
import { Prisma } from "../../prisma/output/prismaclient";

const EVENT_SELECT = {
  id: true,
  title: true,
  description: true,
  eventDate: true,
  eventTime: true,
  location: true,
  type: true,
  status: true,
  createdById: true,
  createdAt: true,
  updatedAt: true,
};

const parseEventDate = (v: string): Date => {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid eventDate");
  return d;
};

export const createEvent = async (req: Request, res: Response) => {
  const parsed = eventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const event = await prisma.event.create({
      data: {
        ...parsed.data,
        eventDate: parseEventDate(parsed.data.eventDate),
        createdById: req.user!.id,
      },
      select: EVENT_SELECT,
    });
    return res.status(201).json({ event });
  } catch (error) {
    logger.error({ error }, "createEvent failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listEvents = async (req: Request, res: Response) => {
  const { scope } = req.query;
  const where: Prisma.EventWhereInput = {};
  if (scope === "upcoming") {
    where.eventDate = { gte: new Date() };
    where.status = { not: "CANCELLED" };
  } else if (scope === "past") {
    where.eventDate = { lt: new Date() };
  }

  try {
    const items = await prisma.event.findMany({
      where,
      orderBy: { eventDate: scope === "past" ? "desc" : "asc" },
      select: EVENT_SELECT,
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listEvents failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const data: Prisma.EventUpdateInput = { ...parsed.data };
    if (parsed.data.eventDate) {
      data.eventDate = parseEventDate(parsed.data.eventDate);
    }

    const event = await prisma.event.update({
      where: { id: req.params.id },
      data,
      select: EVENT_SELECT,
    });
    return res.status(200).json({ event });
  } catch (error) {
    logger.error({ error }, "updateEvent failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: { status: "CANCELLED" },
      select: EVENT_SELECT,
    });
    return res.status(200).json({ event });
  } catch (error) {
    logger.error({ error }, "cancelEvent failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    logger.error({ error }, "deleteEvent failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
