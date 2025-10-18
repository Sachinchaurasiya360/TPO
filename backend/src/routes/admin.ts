import {
  getOneUserDetails,
  getUnApprovedStudent,
  approvedUnApprovedStudent,
  addMembers,
  removeMembers,
} from "../controller/Admin.controller";
import express from "express";
const router = express.Router();

router.get("/getoneuserdetails/:id", getOneUserDetails); //Add the middleware
router.get("/getunapprovedstudent", getUnApprovedStudent);
router.patch("/approvedUnApprovedStudent", approvedUnApprovedStudent);
router.post("/addMembers", addMembers);
router.delete("/removeMembers", removeMembers);

export default router;
