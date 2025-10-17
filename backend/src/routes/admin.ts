import {
  getOneUserDetails,
  getUnApprovedStudent,approvedUnApprovedStudent
} from "../controller/Admin.controller";
import express from "express";
const router = express.Router();

router.get("/getoneuserdetails/:id", getOneUserDetails); //Add the middleware
router.get("/getunapprovedstudent", getUnApprovedStudent);
router.patch("/approvedUnApprovedStudent",approvedUnApprovedStudent)

export default router;
