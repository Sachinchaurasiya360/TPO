import { z } from "zod";
import {
  AcademicYear,
  Role,
  Department,
} from "../../prisma/output/prismaclient";

// ==================== AUTH ====================

export const studentSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  emailId: z.string().email("Invalid email address"),
  studentId: z.string().min(3, "Enter a valid student ID"),
  department: z.nativeEnum(Department),
  academicYear: z.nativeEnum(AcademicYear),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contactNo: z.string().optional(),
});

export const loginSchema = z.object({
  emailId: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  emailId: z.string().email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ==================== FACULTY CREATION (admin-only) ====================

export const createFacultySchema = z.object({
  fullName: z.string().min(2),
  emailId: z.string().email(),
  contactNo: z.string().min(6),
  department: z.nativeEnum(Department),
  isHOD: z.boolean().optional().default(false),
  password: z.string().min(8).optional(),
});

export const updateFacultySchema = z.object({
  fullName: z.string().min(2).optional(),
  contactNo: z.string().min(6).optional(),
  department: z.nativeEnum(Department).optional(),
  isHOD: z.boolean().optional(),
});

export const userStatusSchema = z.object({
  isActive: z.boolean(),
});

export const rejectRegistrationSchema = z.object({
  reason: z.string().optional(),
});

export const listStudentsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  department: z.nativeEnum(Department).optional(),
  academicYear: z.nativeEnum(AcademicYear).optional(),
  role: z.enum(["STUDENT", "ALUMNI"]).optional(),
  isVerified: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  minCgpa: z.coerce.number().min(0).max(10).optional(),
  search: z.string().optional(),
});

// ==================== PROFILE UPDATE ====================

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  legalName: z.string().optional(),
  contactNo: z.string().optional(),
  parentsContactNo: z.string().optional(),
  studentId: z.string().optional(),
  department: z.nativeEnum(Department).optional(),
  academicYear: z.nativeEnum(AcademicYear).optional(),
  skills: z.array(z.string()).optional(),
  socialProfile: z.string().url().optional().or(z.literal("")),
  profilePic: z.string().url().optional(),
  resumeUrl: z.string().url().optional(),
});

// ==================== MARKS ====================

const pct = z.number().min(0).max(100).optional();
const cgpa = z.number().min(0).max(10).optional();

const urlOpt = z.string().url().optional().or(z.literal(""));

export const updateMarksSchema = z.object({
  sscPercentage: pct,
  hscPercentage: pct,
  sem1: cgpa,
  sem2: cgpa,
  sem3: cgpa,
  sem4: cgpa,
  sem5: cgpa,
  sem6: cgpa,
  sem7: cgpa,
  sem8: cgpa,
  sscMarksheetUrl: urlOpt,
  hscMarksheetUrl: urlOpt,
  sem1MarksheetUrl: urlOpt,
  sem2MarksheetUrl: urlOpt,
  sem3MarksheetUrl: urlOpt,
  sem4MarksheetUrl: urlOpt,
  sem5MarksheetUrl: urlOpt,
  sem6MarksheetUrl: urlOpt,
  sem7MarksheetUrl: urlOpt,
  sem8MarksheetUrl: urlOpt,
});

// ==================== INTERNSHIP ====================

export const internshipSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  roleDescription: z.string().optional(),
  duration: z.string().optional(),
  startDate: z.string().datetime().or(z.string().min(1)),
  endDate: z.string().datetime().optional().or(z.string().optional()),
  certificateUrl: z.string().url().optional(),
  hrName: z.string().optional(),
  hrEmail: z.string().email().optional().or(z.literal("")),
  hrPhone: z.string().optional(),
});

// ==================== ACHIEVEMENT ====================

export const achievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  certificateUrl: z.string().url().optional(),
  achievementDate: z.string().datetime().optional().or(z.string().optional()),
});

// ==================== JOB ====================

export const jobSchema = z.object({
  companyName: z.string().min(1),
  companyLogo: z.string().url().optional(),
  jobTitle: z.string().min(1),
  description: z.string().min(1),
  package: z.string().min(1),
  location: z.string().min(1),
  locationType: z.enum(["ON_SITE", "REMOTE", "HYBRID"]),
  jobType: z.enum(["FULL_TIME", "INTERNSHIP", "PPO"]),
  eligibleDepartments: z.array(z.nativeEnum(Department)).min(1),
  minCgpa: z.number().min(0).max(10).optional(),
  eligibleYears: z.array(z.nativeEnum(AcademicYear)).min(1),
  deadline: z.string().datetime().or(z.string().min(1)),
  rounds: z.array(z.string()).optional(),
  openings: z.number().int().positive().optional(),
  bondDetails: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export const updateJobSchema = jobSchema.partial();

export const jobStatusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED"]),
});

export const listJobsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(["OPEN", "CLOSED"]).optional(),
  jobType: z.enum(["FULL_TIME", "INTERNSHIP", "PPO"]).optional(),
  search: z.string().optional(),
});

export const applicationStatusSchema = z.object({
  status: z.enum(["APPLIED", "SHORTLISTED", "INTERVIEW", "SELECTED", "REJECTED"]),
});

export const listApplicationsSchema = z.object({
  status: z
    .enum(["APPLIED", "SHORTLISTED", "INTERVIEW", "SELECTED", "REJECTED"])
    .optional(),
});

// ==================== EVENT ====================

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  eventDate: z.string().datetime().or(z.string().min(1)),
  eventTime: z.string().optional(),
  location: z.string().optional(),
  type: z.enum([
    "PLACEMENT_DRIVE",
    "WORKSHOP",
    "SEMINAR",
    "MOCK_INTERVIEW",
    "WEBINAR",
    "OTHER",
  ]),
});

export const updateEventSchema = eventSchema.partial().extend({
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).optional(),
});

// ==================== ALUMNI ====================

export const alumniProfileSchema = z.object({
  currentOrg: z.string().optional(),
  currentRole: z.string().optional(),
  package: z.string().optional(),
  graduationYear: z.number().int().optional(),
  placedBy: z.string().optional(),
});

export const alumniPostSchema = z.object({
  postType: z.enum(["MENTORSHIP", "REFERRAL", "CAREER_ADVICE", "GENERAL"]),
  title: z.string().min(1),
  body: z.string().min(1),
  companyName: z.string().optional(),
  role: z.string().optional(),
  contactInfo: z.string().optional(),
});

// ==================== VERIFICATION ====================

export const reviewVerificationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  remarks: z.string().optional(),
});

export const reviewEntityFlagSchema = z.object({
  isVerified: z.boolean(),
  remarks: z.string().optional(),
});

export const facultyListStudentsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  academicYear: z.nativeEnum(AcademicYear).optional(),
  isVerified: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  minCgpa: z.coerce.number().min(0).max(10).optional(),
  search: z.string().optional(),
});

export const updateDeptFacultySchema = z.object({
  fullName: z.string().min(2).optional(),
  contactNo: z.string().min(6).optional(),
  isHOD: z.boolean().optional(),
});

// ==================== PAGINATION ====================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Legacy exports retained for any lingering imports; to be removed after refactor
export const signupTypes = studentSignupSchema;
export const loginTypes = loginSchema;
export const updateProfileTypes = updateProfileSchema;
export const internshipTypes = internshipSchema;
export const AchievementTypes = achievementSchema;
export const CgpaTypes = updateMarksSchema;
