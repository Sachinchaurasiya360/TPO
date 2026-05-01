import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import {
  AcademicYear,
  Department,
  Prisma,
  SubmissionStatus,
  TestCategory,
  TestStatus,
} from "../../prisma/output/prismaclient";

// ==================== SCHEMAS ====================

const questionInput = z.object({
  id: z.number().int().optional(),
  question: z.string().min(1),
  option1: z.string().min(1),
  option2: z.string().optional().nullable(),
  option3: z.string().optional().nullable(),
  option4: z.string().optional().nullable(),
  correctOption: z.enum(["1", "2", "3", "4"]),
  marks: z.number().int().positive(),
});

const createTestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  rules: z.array(z.string()).default([]),
  totalTime: z.number().int().min(0),
  minimumMarks: z.number().int().min(0),
  allowedAttempts: z.number().int().min(1).max(10).default(1),
  tabSwitchLimit: z.number().int().min(0).default(3),
  category: z.nativeEnum(TestCategory),
  isHomework: z.boolean().default(false),
  department: z.nativeEnum(Department).optional().nullable(),
  eligibleYears: z.array(z.nativeEnum(AcademicYear)).default([]),
  questions: z.array(questionInput).min(1),
});

const updateTestSchema = createTestSchema.partial().extend({
  questions: z.array(questionInput).optional(),
});

const publishSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

const submitAnswersSchema = z.object({
  answers: z.record(z.string(), z.enum(["1", "2", "3", "4"])),
  tabSwitchCount: z.number().int().min(0).default(0),
});

const reviewSubmissionSchema = z.object({
  finalScore: z.number().int().min(0),
  facultyRemarks: z.string().optional(),
});

// ==================== HELPERS ====================

const totalMarksFromQuestions = (qs: { marks: number }[]) =>
  qs.reduce((sum, q) => sum + q.marks, 0);

const TEST_SELECT_SUMMARY = {
  id: true,
  title: true,
  description: true,
  category: true,
  totalTime: true,
  totalMarks: true,
  minimumMarks: true,
  allowedAttempts: true,
  tabSwitchLimit: true,
  status: true,
  isActive: true,
  isHomework: true,
  department: true,
  eligibleYears: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  _count: { select: { questions: true, submissions: true } },
} satisfies Prisma.AptitudeTestSelect;

// ==================== FACULTY / ADMIN ====================

export const facultyListTests = async (req: Request, res: Response) => {
  try {
    const where: Prisma.AptitudeTestWhereInput = {};
    // Faculty sees their own + tests in their department. Admin sees all.
    if (req.user!.role === "FACULTY") {
      where.OR = [
        { createdById: req.user!.id },
        { department: req.user!.department as Department },
        { department: null },
      ];
    }
    const items = await prisma.aptitudeTest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: TEST_SELECT_SUMMARY,
    });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "facultyListTests failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const facultyGetTest = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    const test = await prisma.aptitudeTest.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!test) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ test });
  } catch (error) {
    logger.error({ error }, "facultyGetTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTest = async (req: Request, res: Response) => {
  const parsed = createTestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }
  try {
    const data = parsed.data;
    const totalMarks = totalMarksFromQuestions(data.questions);
    const test = await prisma.aptitudeTest.create({
      data: {
        title: data.title,
        description: data.description,
        rules: data.rules,
        totalTime: data.totalTime,
        totalMarks,
        minimumMarks: data.minimumMarks,
        allowedAttempts: data.allowedAttempts,
        tabSwitchLimit: data.tabSwitchLimit,
        category: data.category,
        isHomework: data.isHomework,
        department: data.department ?? null,
        eligibleYears: data.eligibleYears,
        createdById: req.user!.id,
        questions: {
          create: data.questions.map((q) => ({
            question: q.question,
            option1: q.option1,
            option2: q.option2 ?? null,
            option3: q.option3 ?? null,
            option4: q.option4 ?? null,
            correctOption: q.correctOption,
            marks: q.marks,
          })),
        },
      },
      include: { questions: true },
    });
    return res.status(201).json({ test });
  } catch (error) {
    logger.error({ error }, "createTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTest = async (req: Request, res: Response) => {
  const parsed = updateTestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const id = Number(req.params.id);
    const existing = await prisma.aptitudeTest.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Not found" });
    if (req.user!.role === "FACULTY" && existing.createdById !== req.user!.id) {
      return res.status(403).json({ message: "Not your test" });
    }

    const data = parsed.data;
    const updateData: Prisma.AptitudeTestUpdateInput = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.rules !== undefined) updateData.rules = data.rules;
    if (data.totalTime !== undefined) updateData.totalTime = data.totalTime;
    if (data.minimumMarks !== undefined) updateData.minimumMarks = data.minimumMarks;
    if (data.allowedAttempts !== undefined)
      updateData.allowedAttempts = data.allowedAttempts;
    if (data.tabSwitchLimit !== undefined)
      updateData.tabSwitchLimit = data.tabSwitchLimit;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.isHomework !== undefined) updateData.isHomework = data.isHomework;
    if (data.department !== undefined) updateData.department = data.department;
    if (data.eligibleYears !== undefined)
      updateData.eligibleYears = data.eligibleYears;

    if (data.questions !== undefined) {
      updateData.totalMarks = totalMarksFromQuestions(data.questions);
      // Replace questions atomically
      await prisma.$transaction([
        prisma.question.deleteMany({ where: { testId: id } }),
        prisma.question.createMany({
          data: data.questions.map((q) => ({
            testId: id,
            question: q.question,
            option1: q.option1,
            option2: q.option2 ?? null,
            option3: q.option3 ?? null,
            option4: q.option4 ?? null,
            correctOption: q.correctOption,
            marks: q.marks,
          })),
        }),
      ]);
    }

    const test = await prisma.aptitudeTest.update({
      where: { id },
      data: updateData,
      include: { questions: true },
    });
    return res.status(200).json({ test });
  } catch (error) {
    logger.error({ error }, "updateTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const setTestStatus = async (req: Request, res: Response) => {
  const parsed = publishSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });
  try {
    const id = Number(req.params.id);
    const existing = await prisma.aptitudeTest.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Not found" });
    if (req.user!.role === "FACULTY" && existing.createdById !== req.user!.id) {
      return res.status(403).json({ message: "Not your test" });
    }

    const status = parsed.data.status as TestStatus;
    const test = await prisma.aptitudeTest.update({
      where: { id },
      data: { status, isActive: status === "PUBLISHED" },
      select: TEST_SELECT_SUMMARY,
    });
    return res.status(200).json({ test });
  } catch (error) {
    logger.error({ error }, "setTestStatus failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTest = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.aptitudeTest.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Not found" });
    if (req.user!.role === "FACULTY" && existing.createdById !== req.user!.id) {
      return res.status(403).json({ message: "Not your test" });
    }
    await prisma.aptitudeTest.delete({ where: { id } });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    logger.error({ error }, "deleteTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== FACULTY: SUBMISSIONS REVIEW ====================

export const listTestSubmissions = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const test = await prisma.aptitudeTest.findUnique({ where: { id } });
    if (!test) return res.status(404).json({ message: "Not found" });
    if (req.user!.role === "FACULTY" && test.createdById !== req.user!.id) {
      return res.status(403).json({ message: "Not your test" });
    }

    const items = await prisma.testSubmission.findMany({
      where: { testId: id, status: { not: "IN_PROGRESS" } },
      orderBy: { submittedAt: "desc" },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            emailId: true,
            studentId: true,
            department: true,
            academicYear: true,
          },
        },
      },
    });
    return res.status(200).json({ items, test });
  } catch (error) {
    logger.error({ error }, "listTestSubmissions failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const reviewSubmission = async (req: Request, res: Response) => {
  const parsed = reviewSubmissionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });
  try {
    const existing = await prisma.testSubmission.findUnique({
      where: { id: req.params.id },
      include: { test: { select: { createdById: true, totalMarks: true } } },
    });
    if (!existing) return res.status(404).json({ message: "Not found" });
    if (
      req.user!.role === "FACULTY" &&
      existing.test.createdById !== req.user!.id
    ) {
      return res.status(403).json({ message: "Not your test" });
    }
    if (parsed.data.finalScore > existing.test.totalMarks) {
      return res.status(400).json({ message: "Score exceeds total marks" });
    }

    const updated = await prisma.testSubmission.update({
      where: { id: req.params.id },
      data: {
        finalScore: parsed.data.finalScore,
        facultyRemarks: parsed.data.facultyRemarks ?? null,
        reviewedById: req.user!.id,
        reviewedAt: new Date(),
        status: "REVIEWED",
      },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: existing.studentId,
        title: "Test results published",
        message: `Your test was reviewed. Score: ${parsed.data.finalScore} / ${existing.test.totalMarks}.`,
        type: "VERIFICATION_RESULT",
        link: `/student/aptitude`,
      },
    });

    return res.status(200).json({ submission: updated });
  } catch (error) {
    logger.error({ error }, "reviewSubmission failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== STUDENT ====================

export const studentListAvailableTests = async (req: Request, res: Response) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { department: true, academicYear: true },
    });
    if (!me) return res.status(404).json({ message: "Not found" });

    const tests = await prisma.aptitudeTest.findMany({
      where: {
        status: "PUBLISHED",
        isActive: true,
        OR: [{ department: null }, { department: me.department }],
        AND: [
          {
            OR: [
              { eligibleYears: { isEmpty: true } },
              ...(me.academicYear
                ? [{ eligibleYears: { has: me.academicYear } }]
                : []),
            ],
          },
        ],
      },
      orderBy: { createdAt: "desc" },
      select: TEST_SELECT_SUMMARY,
    });

    // Attach student's own submissions for each test
    const subs = await prisma.testSubmission.findMany({
      where: {
        studentId: req.user!.id,
        testId: { in: tests.map((t) => t.id) },
      },
      orderBy: { attemptNumber: "desc" },
      select: {
        id: true,
        testId: true,
        attemptNumber: true,
        status: true,
        autoScore: true,
        finalScore: true,
        submittedAt: true,
      },
    });
    const byTest = new Map<number, typeof subs>();
    for (const s of subs) {
      const list = byTest.get(s.testId) ?? [];
      list.push(s);
      byTest.set(s.testId, list);
    }

    const items = tests.map((t) => ({
      ...t,
      mySubmissions: byTest.get(t.id) ?? [],
    }));
    return res.status(200).json({ items });
  } catch (error) {
    logger.error({ error }, "studentListAvailableTests failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Returns questions WITHOUT correct answers (for taking the test).
export const studentStartTest = async (req: Request, res: Response) => {
  try {
    const testId = Number(req.params.id);
    const test = await prisma.aptitudeTest.findUnique({
      where: { id: testId },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            marks: true,
          },
        },
      },
    });
    if (!test || test.status !== "PUBLISHED" || !test.isActive) {
      return res.status(404).json({ message: "Test unavailable" });
    }

    const prevCount = await prisma.testSubmission.count({
      where: {
        testId,
        studentId: req.user!.id,
        status: { not: "IN_PROGRESS" },
      },
    });
    if (prevCount >= test.allowedAttempts) {
      return res.status(409).json({ message: "Attempt limit reached" });
    }

    const existingInProgress = await prisma.testSubmission.findFirst({
      where: {
        testId,
        studentId: req.user!.id,
        status: "IN_PROGRESS",
      },
    });

    const submission =
      existingInProgress ??
      (await prisma.testSubmission.create({
        data: {
          testId,
          studentId: req.user!.id,
          attemptNumber: prevCount + 1,
          answers: {},
        },
      }));

    return res.status(200).json({
      test: {
        id: test.id,
        title: test.title,
        description: test.description,
        rules: test.rules,
        totalTime: test.totalTime,
        totalMarks: test.totalMarks,
        tabSwitchLimit: test.tabSwitchLimit,
        isHomework: test.isHomework,
        questions: test.questions,
      },
      submission: {
        id: submission.id,
        startedAt: submission.startedAt,
        attemptNumber: submission.attemptNumber,
        answers: submission.answers,
        tabSwitchCount: submission.tabSwitchCount,
      },
    });
  } catch (error) {
    logger.error({ error }, "studentStartTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const studentSubmitTest = async (req: Request, res: Response) => {
  const parsed = submitAnswersSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });
  try {
    const submissionId = req.params.id;
    const existing = await prisma.testSubmission.findUnique({
      where: { id: submissionId },
      include: { test: { include: { questions: true } } },
    });
    if (!existing || existing.studentId !== req.user!.id) {
      return res.status(404).json({ message: "Not found" });
    }
    if (existing.status !== "IN_PROGRESS") {
      return res.status(409).json({ message: "Already submitted" });
    }

    // Auto-grade
    let autoScore = 0;
    for (const q of existing.test.questions) {
      const ans = parsed.data.answers[String(q.id)];
      if (ans && ans === q.correctOption) autoScore += q.marks;
    }

    const updated = await prisma.testSubmission.update({
      where: { id: submissionId },
      data: {
        answers: parsed.data.answers,
        tabSwitchCount: parsed.data.tabSwitchCount,
        autoScore,
        submittedAt: new Date(),
        status: "SUBMITTED" as SubmissionStatus,
      },
    });
    return res.status(200).json({
      submission: {
        id: updated.id,
        autoScore,
        totalMarks: existing.test.totalMarks,
        submittedAt: updated.submittedAt,
        status: updated.status,
      },
    });
  } catch (error) {
    logger.error({ error }, "studentSubmitTest failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const studentGetMyResult = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const submission = await prisma.testSubmission.findUnique({
      where: { id },
      include: {
        test: { select: { title: true, totalMarks: true, minimumMarks: true } },
      },
    });
    if (!submission || submission.studentId !== req.user!.id) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ submission });
  } catch (error) {
    logger.error({ error }, "studentGetMyResult failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
