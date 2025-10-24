import express, { Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./routes/auth";
import student from "./routes/student";
import admin from "./routes/admin"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());
const Port = process.env.port;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Health checkup server is running",
  });
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/student", student);
app.use("/api/v1/admin",admin)
// app.use("/api/v1/member", member);

app.listen(Port, () => {
  console.log(`App is running on port ${Port}`);
});
