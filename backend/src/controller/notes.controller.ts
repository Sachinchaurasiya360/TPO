import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { invalidateCache } from "../lib/cache";

const NOTE_AUTHOR_SELECT = {
  id: true,
  fullName: true,
  role: true,
  profilePic: true,
};

// GET /admin/students/:id/notes  OR  /faculty/students/:id/notes
export const listStudentNotes = async (req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student id" });
  }

  try {
    const notes = await prisma.studentNote.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
      include: { author: { select: NOTE_AUTHOR_SELECT } },
    });

    return res.status(200).json({ notes });
  } catch (error) {
    logger.error({ error }, "listStudentNotes failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /admin/students/:id/notes  OR  /faculty/students/:id/notes
export const addStudentNote = async (req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student id" });
  }

  const content = (req.body?.content ?? "").toString().trim();
  if (!content) {
    return res.status(400).json({ message: "Note content is required" });
  }
  if (content.length > 2000) {
    return res.status(400).json({ message: "Note must be 2000 characters or less" });
  }

  const authorId = req.user!.id;

  try {
    // Verify the student exists
    const student = await prisma.user.findFirst({
      where: { id: studentId, role: { in: ["STUDENT", "ALUMNI"] } },
      select: { id: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const note = await prisma.studentNote.create({
      data: { studentId, authorId, content },
      include: { author: { select: NOTE_AUTHOR_SELECT } },
    });

    invalidateCache(`student:notes:${studentId}`);

    return res.status(201).json({ note });
  } catch (error) {
    logger.error({ error }, "addStudentNote failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /admin/students/:id/notes/:noteId  OR  /faculty/students/:id/notes/:noteId
export const deleteStudentNote = async (req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  const { noteId } = req.params;
  const requesterId = req.user!.id;
  const requesterRole = req.user!.role;

  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student id" });
  }

  try {
    const note = await prisma.studentNote.findFirst({
      where: { id: noteId, studentId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Admin can delete any note; faculty/HOD can only delete their own
    if (requesterRole !== "ADMIN" && note.authorId !== requesterId) {
      return res.status(403).json({ message: "You can only delete your own notes" });
    }

    await prisma.studentNote.delete({ where: { id: noteId } });

    invalidateCache(`student:notes:${studentId}`);

    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    logger.error({ error }, "deleteStudentNote failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
