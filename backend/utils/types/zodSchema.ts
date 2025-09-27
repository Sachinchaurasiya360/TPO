import { string, z } from "zod";
import { UserAcademicYear } from "../../prisma/output/prismaclient";
export const signupTypes = z.object({
  fullName: z.string().min(2, "Minimum length should be 2"),
  emailId: z.string().email(),
  studentId: z.string().min(5),
  department: z.string().min(5),
  password: z.string(),
});
export const loginTypes = z.object({
  emailId: z.string(),
  password: z.string(),
});
export const updateProfileTypes = z.object({
  legalName: z.string().optional(),
  contactNo: z.string().optional(),
  academicYear: z.nativeEnum(UserAcademicYear).optional(),
  skills: z.array(z.string()).optional(),
  profilePic: z.string().optional(),
  resumeUrl: z.string().optional(),
  socialProfile: z.string().optional(),
});
export const internshipTypes = z.object({
  id: z.string().optional(),
  title: z.string().max(20),
  companyName: z.string(),
  roleDescription: z.string(),
  duration: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  certificateUrl: z.string(),
  isVerified: z.boolean().default(false),
});

export const AchievementTypes = z.object({
  id: z.string().optional(),
  title: z.string(),
  details: z.string(),
  certificateUrl: z.string(),
  AchievementTime: z.string(),
});

export const AlumniTypes = z.object({
  PlacedBY: z.string(),
  PastOrg: z.array(z.string()),
  CurrentOrg: z.string(),
  package: z.string(),
});
export const CgpaTypes = z.object({
  id: z.string().optional(),
  sem1: z.number().optional(),
  sem2: z.number().optional(),
  sem3: z.number().optional(),
  sem4: z.number().optional(),
  sem5: z.number().optional(),
  sem6: z.number().optional(),
  sem7: z.number().optional(),
  sem8: z.number().optional(),
});
