import { z } from "zod";
import { UserAcademicYear } from "../../prisma/prismaclient";
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
