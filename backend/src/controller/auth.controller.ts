import express, { Response, Request } from "express";
import { PrismaClient } from "../../prisma/prismaclient";
import { signupTypes, loginTypes } from "../../utils/types/zodSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pino from "pino";

const prisma = new PrismaClient();
const router = express.Router();

export const signin = async (req: Request, res: Response) => {
  try {
    const result = loginTypes.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }
    const { emailId, password } = result.data;
    const getdetails = await prisma.user.findUnique({
      where: { emailId },
    });

    if (!getdetails) {
      return res.status(404).json({
        message: "Email does not exist",
      });
    }
    const comparePassword = await bcrypt.compare(password, getdetails.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "You have entered wrong password",
      });
    }

    const token = jwt.sign(
      { fullName: getdetails.fullName, emailId: emailId },
      process.env.JWTSECRET as string,
      { expiresIn: "12h" }
    );

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000 * 60,
      sameSite: "strict",
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: getdetails.id,
        fullName: getdetails.fullName,
        emailId: getdetails.emailId,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server errro",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const result = signupTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten(),
      });
    }
    const { fullName, emailId, studentId, department, password } = result.data;
    const isUserExist = await prisma.user.findUnique({
      where: { emailId },
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        emailId,
        studentId,
        department,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    return res.status(201).json({
      message: "Account Created, Please go to Login Page",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,

      message: "Internal server error",
    });
  }
};
