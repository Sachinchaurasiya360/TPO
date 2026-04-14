import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { sendMail } from "../lib/mail";
import {
  accountApprovedEmail,
  accountRejectedEmail,
} from "../lib/emailTemplates";
import { rejectRegistrationSchema } from "../../utils/types/zodSchema";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const [
      totalStudents,
      totalAlumni,
      totalFaculty,
      pendingRegistrations,
      pendingVerifications,
      unverifiedInternships,
      unverifiedAchievements,
      studentsByDept,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT", isActive: true } }),
      prisma.user.count({ where: { role: "ALUMNI", isActive: true } }),
      prisma.user.count({ where: { role: "FACULTY", isActive: true } }),
      prisma.user.count({
        where: { role: "STUDENT", isVerified: false, isActive: true },
      }),
      prisma.verificationRequest.count({ where: { status: "PENDING" } }),
      prisma.internship.count({ where: { isVerified: false } }),
      prisma.achievement.count({ where: { isVerified: false } }),
      prisma.user.groupBy({
        by: ["department"],
        where: { role: "STUDENT", isActive: true, department: { not: null } },
        _count: { _all: true },
      }),
    ]);

    return res.status(200).json({
      totals: {
        students: totalStudents,
        alumni: totalAlumni,
        faculty: totalFaculty,
      },
      pending: {
        registrations: pendingRegistrations,
        profileOrMarksVerifications: pendingVerifications,
        internshipVerifications: unverifiedInternships,
        achievementVerifications: unverifiedAchievements,
      },
      studentsByDepartment: studentsByDept.map((row) => ({
        department: row.department,
        count: row._count._all,
      })),
    });
  } catch (error) {
    logger.error({ error }, "admin getStats failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listPendingRegistrations = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.user.findMany({
      where: { role: "STUDENT", isVerified: false, isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        emailId: true,
        contactNo: true,
        studentId: true,
        department: true,
        academicYear: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listPendingRegistrations failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const approveRegistration = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) {
      return res.status(400).json({ message: "Already approved" });
    }

    await prisma.user.update({
      where: { id },
      data: { isVerified: true, isActive: true },
    });

    const { subject, html } = accountApprovedEmail(user.fullName);
    sendMail({ to: user.emailId, subject, html }).catch((e) =>
      logger.error({ e }, "Approved email failed")
    );

    return res.status(200).json({ message: "Account approved" });
  } catch (error) {
    logger.error({ error }, "approveRegistration failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectRegistration = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const parsed = rejectRegistrationSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    const { subject, html } = accountRejectedEmail(user.fullName, parsed.data.reason);
    sendMail({ to: user.emailId, subject, html }).catch((e) =>
      logger.error({ e }, "Rejected email failed")
    );

    return res.status(200).json({ message: "Account rejected" });
  } catch (error) {
    logger.error({ error }, "rejectRegistration failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
