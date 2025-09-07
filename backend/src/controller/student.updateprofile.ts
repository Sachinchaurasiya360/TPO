import express, { Response, Request } from "express";
import { updateProfileTypes } from "../../utils/types/zodSchema";
import { PrismaClient } from "../../prisma/prismaclient";
import logger from "../../utils/logger/logger";
const prisma = new PrismaClient();

export const updateprofile = async (req: Request, res: Response) => {
  try {
    const result = updateProfileTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(200).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const getUserFromDb = await prisma.user.findUnique({
      where: { emailId: (req as any).user.emailId },
    });
    if (!getUserFromDb) {
      return res.status(500).json({
        Error: "User doesn't exist",
      });
    }
    const updateprofile = await prisma.user.update({
      where: { id: getUserFromDb.id },
      data: result.data,
    });
    logger.info(
      { userId: (req as any).user.id },
      "Profile updated successfully"
    );

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
