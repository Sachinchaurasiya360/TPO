import { Response, Request } from "express";
import { Department, PrismaClient } from "../../prisma/output/prismaclient";
import { signupTypes, loginTypes } from "../../utils/types/zodSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/email/sendEmail";
import { adminSignupTypes } from "../../utils/types/zodSchema";
import { signupBody, signupSubject } from "../../utils/email/subjectAndBody";

const prisma = new PrismaClient();

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
    const { fullName, emailId, department, password } = result.data;
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
        department,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    sendEmail(emailId, signupSubject, signupBody);
    return res.status(201).json({
      message: "Account Created, Please wait for verification",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgotpassword = async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;
    const isUserExist = await prisma.user.findUnique({
      where: { emailId },
    });
    if (!isUserExist) {
      return res.status(401).json({
        message: "Email doesn't exist",
      });
    }
    const sendingEmail = await sendEmail(
      isUserExist.emailId,
      "subject",
      "body"
    );
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error"
    })
  }
};

export const WhoAmI = async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const result = adminSignupTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        Error: result.error.flatten().fieldErrors,
        success: false,
      });
    }

    const { fullName, contactNo, emailId, role, password } = result.data;
    const isEmailExist = await prisma.admin.findUnique({
      where: { emailId },
    });
    if (isEmailExist) {
      return res.status(409).json({
        message: "This email exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createAdmin = await prisma.admin.create({
      data: {
        fullName: fullName,
        contactNo: contactNo,
        emailId: emailId,
        password: hashedPassword,
        role: role,
      },
    });
    return res.status(200).json({
      message: "Account Created",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const AdminLogin = async (req: Request, res: Response) => {
  try {
    const result = loginTypes.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { emailId, password } = result.data;
    const isEmailExist = await prisma.admin.findUnique({
      where: { emailId },
    });
    if (!isEmailExist) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!comparePassword) {
      return res.status(401).json({
        message: "You have entered wrong password",
      });
    }

    const token = jwt.sign(
      {
        fullName: isEmailExist.fullName,
        emailId,
      },
      process.env.JWTSECRET as string,
      { expiresIn: "3000h" }
    );

    res.cookie("token", token, {
      maxAge: 60 * 60 * 60 * 60,
      sameSite: "strict",
      httpOnly: true,
    });
    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: {
        FullName: isEmailExist.fullName,
        emailId: isEmailExist.emailId,
        role: isEmailExist.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
