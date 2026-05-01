import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import logger from "../../utils/logger/logger";
import {
  alumniProfileSchema,
  alumniPostSchema,
} from "../../utils/types/zodSchema";
import { Department, Prisma } from "../../prisma/output/prismaclient";

// ==================== ALUMNI PROFILE ====================

const ALUMNI_USER_SELECT = {
  id: true,
  fullName: true,
  emailId: true,
  contactNo: true,
  profilePic: true,
  department: true,
  studentId: true,
  skills: true,
  socialProfile: true,
} as const;

export const getMyAlumniProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        ...ALUMNI_USER_SELECT,
        alumniProfile: {
          include: {
            pastOrgs: { orderBy: { joiningDate: "desc" } },
            higherStudies: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ user });
  } catch (error) {
    logger.error({ error }, "getMyAlumniProfile failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAlumniProfile = async (req: Request, res: Response) => {
  const parsed = alumniProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }
  try {
    const profile = await prisma.alumniProfile.upsert({
      where: { userId: req.user!.id },
      update: parsed.data,
      create: { userId: req.user!.id, ...parsed.data },
      include: {
        pastOrgs: { orderBy: { joiningDate: "desc" } },
        higherStudies: true,
      },
    });
    return res.status(200).json({ profile });
  } catch (error) {
    logger.error({ error }, "updateAlumniProfile failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== PAST ORGS ====================

const pastOrgSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  joiningDate: z.string().min(1),
  leavingDate: z.string().optional(),
});

const parseDate = (v: string) => {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
};

const ensureAlumniProfile = async (userId: number) => {
  return prisma.alumniProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
};

export const addPastOrg = async (req: Request, res: Response) => {
  const parsed = pastOrgSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });
  try {
    const alumni = await ensureAlumniProfile(req.user!.id);
    const pastOrg = await prisma.pastOrg.create({
      data: {
        alumniId: alumni.id,
        companyName: parsed.data.companyName,
        role: parsed.data.role,
        joiningDate: parseDate(parsed.data.joiningDate),
        leavingDate: parsed.data.leavingDate ? parseDate(parsed.data.leavingDate) : null,
      },
    });
    return res.status(201).json({ pastOrg });
  } catch (error) {
    logger.error({ error }, "addPastOrg failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePastOrg = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const alumni = await prisma.alumniProfile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true },
    });
    if (!alumni) return res.status(404).json({ message: "Not found" });

    const result = await prisma.pastOrg.deleteMany({
      where: { id, alumniId: alumni.id },
    });
    if (result.count === 0) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    logger.error({ error }, "deletePastOrg failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== HIGHER STUDIES ====================

const higherStudiesSchema = z.object({
  collegeName: z.string().min(1),
  branch: z.string().min(1),
  location: z.string().min(1),
  joiningDate: z.string().min(1),
  leavingDate: z.string().optional(),
});

export const upsertHigherStudies = async (req: Request, res: Response) => {
  const parsed = higherStudiesSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });
  try {
    const alumni = await ensureAlumniProfile(req.user!.id);
    const data = {
      collegeName: parsed.data.collegeName,
      branch: parsed.data.branch,
      location: parsed.data.location,
      joiningDate: parseDate(parsed.data.joiningDate),
      leavingDate: parsed.data.leavingDate ? parseDate(parsed.data.leavingDate) : null,
    };
    const row = await prisma.higherStudies.upsert({
      where: { alumniId: alumni.id },
      update: data,
      create: { alumniId: alumni.id, ...data },
    });
    return res.status(200).json({ higherStudies: row });
  } catch (error) {
    logger.error({ error }, "upsertHigherStudies failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteHigherStudies = async (req: Request, res: Response) => {
  try {
    const alumni = await prisma.alumniProfile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true },
    });
    if (!alumni) return res.status(404).json({ message: "Not found" });
    await prisma.higherStudies.deleteMany({ where: { alumniId: alumni.id } });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    logger.error({ error }, "deleteHigherStudies failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== POSTS (Alumni CRUD) ====================

const POST_INCLUDE = {
  alumni: {
    select: {
      id: true,
      fullName: true,
      profilePic: true,
      department: true,
      alumniProfile: {
        select: { currentOrg: true, currentRole: true, graduationYear: true },
      },
    },
  },
} as const;

export const createPost = async (req: Request, res: Response) => {
  const parsed = alumniPostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
  }
  try {
    const post = await prisma.alumniPost.create({
      data: { ...parsed.data, alumniId: req.user!.id },
      include: POST_INCLUDE,
    });

    // Notify all current students (in-app only)
    const students = await prisma.user.findMany({
      where: { role: "STUDENT", isActive: true, isVerified: true },
      select: { id: true },
    });
    if (students.length > 0) {
      await prisma.notification.createMany({
        data: students.map((s) => ({
          userId: s.id,
          title: `New ${parsed.data.postType.toLowerCase().replace("_", " ")} from alumni`,
          message: parsed.data.title,
          type: "ALUMNI_POST" as const,
          link: `/alumni/feed`,
        })),
      });
    }

    return res.status(201).json({ post });
  } catch (error) {
    logger.error({ error }, "createPost failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listMyPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.alumniPost.findMany({
      where: { alumniId: req.user!.id },
      orderBy: { createdAt: "desc" },
      include: POST_INCLUDE,
    });
    return res.status(200).json({ items: posts });
  } catch (error) {
    logger.error({ error }, "listMyPosts failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await prisma.alumniPost.deleteMany({
      where: { id: req.params.id, alumniId: req.user!.id },
    });
    if (result.count === 0) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    logger.error({ error }, "deletePost failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== PUBLIC FEED & DIRECTORY ====================

const feedQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
  postType: z
    .enum(["MENTORSHIP", "REFERRAL", "CAREER_ADVICE", "GENERAL"])
    .optional(),
  search: z.string().optional(),
});

export const listFeed = async (req: Request, res: Response) => {
  const parsed = feedQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ message: "Invalid filters" });
  const { page, limit, postType, search } = parsed.data;

  const where: Prisma.AlumniPostWhereInput = {};
  if (postType) where.postType = postType;
  if (search?.trim()) {
    const t = search.trim();
    where.OR = [
      { title: { contains: t, mode: "insensitive" } },
      { body: { contains: t, mode: "insensitive" } },
      { companyName: { contains: t, mode: "insensitive" } },
    ];
  }

  try {
    const [items, total] = await Promise.all([
      prisma.alumniPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: POST_INCLUDE,
      }),
      prisma.alumniPost.count({ where }),
    ]);
    return res.status(200).json({
      items,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    logger.error({ error }, "listFeed failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

const directoryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  department: z.nativeEnum(Department).optional(),
  graduationYear: z.coerce.number().int().optional(),
  currentOrg: z.string().optional(),
  track: z.enum(["WORKING", "HIGHER_STUDIES"]).optional(),
  search: z.string().optional(),
});

export const listDirectory = async (req: Request, res: Response) => {
  const parsed = directoryQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ message: "Invalid filters" });
  const { page, limit, department, graduationYear, currentOrg, track, search } =
    parsed.data;

  const where: Prisma.UserWhereInput = {
    role: "ALUMNI",
    isActive: true,
  };
  if (department) where.department = department;
  if (search?.trim()) {
    const t = search.trim();
    where.OR = [
      { fullName: { contains: t, mode: "insensitive" } },
      { emailId: { contains: t, mode: "insensitive" } },
    ];
  }

  const alumniProfileWhere: Prisma.AlumniProfileWhereInput = {};
  if (graduationYear) alumniProfileWhere.graduationYear = graduationYear;
  if (currentOrg?.trim())
    alumniProfileWhere.currentOrg = {
      contains: currentOrg.trim(),
      mode: "insensitive",
    };
  if (track === "HIGHER_STUDIES") alumniProfileWhere.higherStudies = { isNot: null };
  if (track === "WORKING") {
    const existing = alumniProfileWhere.currentOrg;
    alumniProfileWhere.currentOrg =
      existing && typeof existing === "object"
        ? { ...existing, not: null }
        : { not: null };
  }

  if (Object.keys(alumniProfileWhere).length > 0) {
    where.alumniProfile = alumniProfileWhere;
  }

  try {
    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { fullName: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          fullName: true,
          emailId: true,
          profilePic: true,
          department: true,
          socialProfile: true,
          alumniProfile: {
            select: {
              currentOrg: true,
              currentRole: true,
              package: true,
              graduationYear: true,
              higherStudies: {
                select: { collegeName: true, branch: true, location: true },
              },
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);
    return res.status(200).json({
      items,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    logger.error({ error }, "listDirectory failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAlumniById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    const user = await prisma.user.findFirst({
      where: { id, role: "ALUMNI" },
      select: {
        ...ALUMNI_USER_SELECT,
        alumniProfile: {
          include: {
            pastOrgs: { orderBy: { joiningDate: "desc" } },
            higherStudies: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ user });
  } catch (error) {
    logger.error({ error }, "getAlumniById failed");
    return res.status(500).json({ message: "Internal server error" });
  }
};
