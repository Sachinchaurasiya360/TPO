import express from "express";
import { signin, signup } from "../controller/auth.controller";
import { updateprofile } from "../controller/student.updateprofile";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/updateprofile",updateprofile)

export default router;
