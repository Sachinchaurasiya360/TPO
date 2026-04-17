import { Request, Response } from "express";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import { Prisma } from "../../prisma/output/prismaclient";

const PUBLIC_JOB_SELECT = {
  id: true,
  companyName: true,
  jobTitle: true,
  description: true,
  package: true,
  location: true,
  locationType: true,
  jobType: true,
  eligibleDepartments: true,
  minCgpa: true,
  eligibleYears: true,
  deadline: true,
  rounds: true,
  openings: true,
  bondDetails: true,
  additionalNotes: true,
  status: true,
  createdAt: true,
};

export const listEligibleJobs = async (req: Request, res: Response) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { department: true, academicYear: true, avgCgpa: true },
    });
    if (!me) return res.status(404).json({ message: "User not found" });

    const [items, applications] = await Promise.all([
      prisma.job.findMany({
        where: { status: "OPEN", deadline: { gte: new Date() } },
        orderBy: { deadline: "asc" },
        select: {
          ...PUBLIC_JOB_SELECT,
          _count: { select: { applications: true } },
        },
      }),
      prisma.jobApplication.findMany({
        where: { studentId: req.user!.id },
        select: { jobId: true, status: true, appliedAt: true },
      }),
    ]);

    const appMap = new Map(applications.map((a) => [a.jobId, a]));
    const cgpa = me.avgCgpa ?? 0;
    const enriched = items.map((j) => {
      const deptOk =
        !me.department || j.eligibleDepartments.includes(me.department as any);
      const yearOk =
        !me.academicYear || j.eligibleYears.includes(me.academicYear as any);
      const cgpaOk = j.minCgpa === null || cgpa >= j.minCgpa;
      const reasons: string[] = [];
      if (!deptOk) reasons.push("department");
      if (!yearOk) reasons.push("year");
      if (!cgpaOk) reasons.push("cgpa");
      return {
        ...j,
        myApplication: appMap.get(j.id) || null,
        eligible: deptOk && yearOk && cgpaOk,
        ineligibleReasons: reasons,
      };
    });

    return res.status(200).json({ items: enriched });
  } catch (error) {
    logger.error({ error }, "listEligibleJobs failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEligibleJob = async (req: Request, res: Response) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        department: true,
        academicYear: true,
        avgCgpa: true,
        resumeUrl: true,
      },
    });
    if (!me) return res.status(404).json({ message: "User not found" });

    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      select: PUBLIC_JOB_SELECT,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });

    const deptOk =
      !me.department ||
      job.eligibleDepartments.includes(me.department as any);
    const yearOk =
      !me.academicYear ||
      job.eligibleYears.includes(me.academicYear as any);
    const cgpaOk = job.minCgpa === null || (me.avgCgpa ?? 0) >= job.minCgpa;
    const eligible = deptOk && yearOk && cgpaOk;

    const myApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_studentId: { jobId: job.id, studentId: req.user!.id },
      },
      select: { id: true, status: true, appliedAt: true, updatedAt: true },
    });

    return res.status(200).json({
      job,
      eligible,
      hasResume: !!me.resumeUrl,
      myApplication,
    });
  } catch (error) {
    logger.error({ error }, "getEligibleJob failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const applyToJob = async (req: Request, res: Response) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        department: true,
        academicYear: true,
        avgCgpa: true,
        resumeUrl: true,
      },
    });
    if (!me) return res.status(404).json({ message: "User not found" });

    if (!me.resumeUrl) {
      return res
        .status(400)
        .json({ message: "Upload your resume before applying" });
    }

    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        status: true,
        deadline: true,
        eligibleDepartments: true,
        eligibleYears: true,
        minCgpa: true,
        companyName: true,
        jobTitle: true,
      },
    });
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status !== "OPEN") {
      return res.status(400).json({ message: "Job is not accepting applications" });
    }
    if (job.deadline.getTime() < Date.now()) {
      return res.status(400).json({ message: "Application deadline has passed" });
    }

    const deptOk =
      !me.department ||
      job.eligibleDepartments.includes(me.department as any);
    const yearOk =
      !me.academicYear ||
      job.eligibleYears.includes(me.academicYear as any);
    const cgpaOk = job.minCgpa === null || (me.avgCgpa ?? 0) >= job.minCgpa;
    if (!deptOk || !yearOk || !cgpaOk) {
      return res.status(403).json({ message: "You are not eligible for this job" });
    }

    const existing = await prisma.jobApplication.findUnique({
      where: {
        jobId_studentId: { jobId: job.id, studentId: req.user!.id },
      },
    });
    if (existing) {
      return res.status(409).json({ message: "Already applied to this job" });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        studentId: req.user!.id,
        status: "APPLIED",
      },
    });

    return res.status(201).json({ application });
  } catch (error) {
    logger.error({ error }, "applyToJob failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listMyApplications = async (req: Request, res: Response) => {
  try {
    const items = await prisma.jobApplication.findMany({
      where: { studentId: req.user!.id },
      orderBy: { appliedAt: "desc" },
      include: {
        job: {
          select: {
            id: true,
            companyName: true,
            jobTitle: true,
            package: true,
            location: true,
            locationType: true,
            jobType: true,
            deadline: true,
            status: true,
          },
        },
      },
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "listMyApplications failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
