import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/output/prismaclient";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getOneUserDetails = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getUnApprovedStudent = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getDepartmentWiseStudent = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getStudentByMultipleFilter = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (error) {}
};
export const addMembers = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const removeMembers = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
