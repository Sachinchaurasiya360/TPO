import {
  getOneUserDetails,
  getUnApprovedStudent,
  approvedUnApprovedStudent,
  addMembers,
  removeMembers,
  currentMembers,
} from "../controller/Admin.controller.js";
import express from "express";
const router = express.Router();

router.get("/getoneuserdetails/:id", getOneUserDetails); //Add the middleware
router.get("/getunapprovedstudent", getUnApprovedStudent);
router.patch("/approvedUnApprovedStudent", approvedUnApprovedStudent);
router.post("/addMembers", addMembers);
router.delete("/removeMembers", removeMembers);
router.get("/getCurrentMembers", currentMembers);

export default router;
