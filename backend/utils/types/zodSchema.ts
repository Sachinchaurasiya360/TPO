import {  email, z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Minimum length should be 2"),
  emailId: z.string().email(),
  studentId: z.string().min(5),
  department: z.string().min(5),
  password: z.string(),
});
export const loginSchema=z.object({
  emailId:z.string(),
  password:z.string()
})