import express from "express";
import {
  signin,
  signup,
  logout,
  me,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", isAuthenticated, me);

export default router;
