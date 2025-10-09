import express from "express";
import { isAutheticated } from "../middleware/isAuthenticated";
import {
  updateprofile,
  updateinternship,
  updateAchievement,
  UpdateCgpa,
} from "../controller/student.updateprofile";
const router = express.Router();

router.patch("/updateprofile", isAutheticated, updateprofile);
router.patch("/updateinternship", isAutheticated, updateinternship);
router.patch("/updateAchievement", isAutheticated, updateAchievement);
router.patch("/UpdateCgpa", isAutheticated, UpdateCgpa);

export default router;
