import { Request, Response } from "express";
import { Department, PrismaClient } from "../../prisma/output/prismaclient";
import { sendEmail } from "../../utils/email/sendEmail";
import {
  adminAccountCreationbody,
  adminAccountCreationsubject,
  verificationBody,
  verificationSubject,
} from "../../utils/email/subjectAndBody";
import { adminSignupTypes } from "../../utils/types/zodSchema";
const prisma = new PrismaClient();

export const getOneUserDetails = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.id);
    const getUserDetails = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        fullName: true,
        legalName: true,
        contactNo: true,
        emailId: true,
        parentsContactNo: true,
        studentId: true,
        sscPercentage: true,
        hscPercentage: true,
        department: true,
        academicYear: true,
        skills: true,
        profilePic: true,
        resumeUrl: true,
        socialProfile: true,
        cgpa: true,
        achievements: true,
        internships: true,
        password: false,
      }, 
    });

    if (!getUserDetails) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }
    return res.status(200).json({
      message: "User found",
      data: getUserDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getUnApprovedStudent = async (req: Request, res: Response) => {
  try {
    const getPendingStudents = await prisma.user.findMany({
      where: { isVerified: false },
      select: {
        id: true,
        fullName: true,
        department: true,
      },
      orderBy: { fullName: "asc" },
      take: 20,
    });
    if (getPendingStudents.length === 0) {
      return res.status(400).json({
        message: "All student's are verified",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Pending student list:",
      data: getPendingStudents,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const approvedUnApprovedStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const studentid = req.body.id;
    if (!studentid) {
      return res.status(201).json({
        message: "Student id doesn't found",
      });
    }
    const approvingStudent = await prisma.user.update({
      where: { id: studentid },
      data: {
        isVerified: true,
      },
    });
    const email = approvingStudent.emailId;
    // sendEmail(email, verificationSubject, verificationBody);
    return res.status(200).json({
      message: "user verification successful now they can login",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getDepartmentWiseStudent = async (req: Request, res: Response) => {
  try {
    const departmentName = req.params.department as Department;
    const pageNo = Number(req.query.pageNo) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (pageNo - 1) * limit;
    if (!departmentName) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }
    const getStudentForDeparment = await prisma.user.findMany({
      where: { department: departmentName, isAlumni: false },
      select: {
        fullName: true,
        profilePic: true,
        contactNo: true,
        emailId: true,
        resumeUrl: true,
      },
      skip,
      take: limit,
      orderBy: { fullName: "asc" },
    });
    const totalStudent = await prisma.user.count({
      where: { department: departmentName, isAlumni: false },
    });
    const totalPage = Math.ceil(totalStudent / limit);
    return res.status(200).json({
      message: "Total student",
      meta: {
        currentPage: pageNo,
        totalPage,
        totalStudent,
        limit,
      },
      data: getStudentForDeparment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const addMembers = async (req: Request, res: Response) => {
  try {
    const result = adminSignupTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { fullName, contactNo, emailId, password, role } = result.data;
    const isEmailExist = await prisma.admin.findUnique({
      where: { emailId },
    });
    if (isEmailExist) {
      return res.status(400).json({
        message: "This email is already registred",
      });
    }
    const createAdmin = await prisma.admin.create({
      data: { fullName, contactNo, emailId, password, role },
    });
    const emailbody = adminAccountCreationbody(fullName, password);
    await sendEmail(emailId, adminAccountCreationsubject, emailbody);
    return res.status(200).json({
      message: "Admin Added",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const removeMembers = async (req: Request, res: Response) => {
  try {
    const adminId = Number(req.body.id);
    const deleteingAdmin = await prisma.admin.delete({
      where: { id: adminId },
    });
    return res.status(200).json({
      message: "User removed ",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const currentMembers = async (req: Request, res: Response) => {
  try {
    const getCurrentMembers = await prisma.admin.findMany({});
    return res.status(200).json({
      message: "Current Member",
      data: getCurrentMembers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
