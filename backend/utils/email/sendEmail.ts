import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.error("hello");
    const transporter = nodemailer.createTransport({
      host: "gmail",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const info = await transporter.sendMail({
      from: "TPO Vishwaniketan",
      to: to,
      subject: subject,
      // text: text,
       html: html
    });
    return "Email sent";
  } catch (error) {
    console.error(error);
  }
};
