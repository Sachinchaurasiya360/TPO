import { Response, Request } from "express";
import {
  internshipTypes,
  updateProfileTypes,
  AchievementTypes,
  CgpaTypes,
} from "../../utils/types/zodSchema";
import { PrismaClient } from "../../prisma/output/prismaclient";
const prisma = new PrismaClient();

export const updateprofile = async (req: Request, res: Response) => {
  try {
    const result = updateProfileTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const updateprofile = await prisma.user.update({
      where: { emailId: (req as any).user.emailId },
      data: result.data,
    });
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server errro",
      success: false,
    });
  }
};
export const updateinternship = async (req: Request, res: Response) => {
  try {
    const internship = internshipTypes.safeParse(req.body);
    if (!internship.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: internship.error.flatten().fieldErrors,
      });
    }
    const { id, ...data } = internship.data;
    const updatingInternship = await prisma.internship.upsert({
      where: { id: id ?? ""  },
      update: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
      create: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
    });
    return res.status(200).json({
      message: id
        ? "Internship updated successfully"
        : "Internship created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const updateAchievement = async (req: Request, res: Response) => {
  try {
    const Achievement = AchievementTypes.safeParse(req.body);
    if (!Achievement.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: Achievement.error.flatten().fieldErrors,
      });
    }

    const { id, ...data } = Achievement.data;
    const updatingAchievement = await prisma.achievement.upsert({
      where: { id: id ?? " " },
      update: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
      create: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
    });
    return res.status(200).json({
      message: id ? "Achievement Updated" : "Achievement Added",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Intrnal Server error",
      success: false,
    });
  }
};
export const UpdateCgpa = async (req: Request, res: Response) => {
  try {
    const Cgpa = CgpaTypes.safeParse(req.body);
    if (!Cgpa.success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }
    const { id, ...data } = Cgpa.data;
    const updatingCgpa = await prisma.cgpa.upsert({
      where: { id: id ?? " " },
      update: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
      create: {
        ...data,
        student: { connect: { emailId: (req as any).user.emailId } },
      },
    });
    return res.status(200).json({
      success:true,
      message:id ? " Cgpa Updated":" Cgpa Added" 
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

