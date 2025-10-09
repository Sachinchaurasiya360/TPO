import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
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
      from: "mrsacinchaurasiya@gmail.com",
      to: to,
      subject: subject,
      text: text
      // html: "<b>Hello world?</b>", // HTML body
    });
    return "Email sent";
  } catch (error) {
    console.error(error);
  }
};
