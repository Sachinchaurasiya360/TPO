import express, { Request, Response } from "express";
import dotenv from "dotenv";
import auth from "./routes/auth"
dotenv.config();
const app = express();
app.use(express.json());

const Port = process.env.port;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Health checkup server is running",
  });
});

app.use('/api/v1/auth',auth)
app.listen(Port, () => {
  console.log(`App is running on port ${Port}`);
});
