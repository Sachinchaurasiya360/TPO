import express from "express";
import { Request, Response } from "express";
import { signin, signup } from "../controller/auth.controller";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
