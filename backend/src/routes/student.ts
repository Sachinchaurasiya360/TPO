import express from "express";
import { isAuthenticated, isStudent } from "../middleware/auth";
import { imageUpload, pdfUpload, handleUploadError } from "../middleware/upload";
import {
  getProfile,
  updateProfile,
  uploadProfilePic,
  uploadResume,
  uploadCertificate,
  uploadMarksheet,
  cancelProfileVerification,
} from "../controller/student.controller";
import { getMarks, updateMarks } from "../controller/marks.controller";
import {
  listInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../controller/internship.controller";
import {
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controller/achievement.controller";
import {
  listEligibleJobs,
  getEligibleJob,
  applyToJob,
  listMyApplications,
} from "../controller/student.jobs.controller";

const router = express.Router();

router.use(isAuthenticated, isStudent);

// F02 - Profile
router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.post(
  "/profile/profile-pic",
  imageUpload.single("file"),
  handleUploadError,
  uploadProfilePic
);
router.post(
  "/profile/resume",
  pdfUpload.single("file"),
  handleUploadError,
  uploadResume
);

// F03 - Marks
router.get("/marks", getMarks);
router.patch("/marks", updateMarks);

// F04 - Internships
router.get("/internships", listInternships);
router.post("/internships", createInternship);
router.patch("/internships/:id", updateInternship);
router.delete("/internships/:id", deleteInternship);

// F05 - Achievements
router.get("/achievements", listAchievements);
router.post("/achievements", createAchievement);
router.patch("/achievements/:id", updateAchievement);
router.delete("/achievements/:id", deleteAchievement);

// Generic uploads (returns { url })
router.post(
  "/uploads/certificate",
  pdfUpload.single("file"),
  handleUploadError,
  uploadCertificate
);
router.post(
  "/uploads/marksheet",
  pdfUpload.single("file"),
  handleUploadError,
  uploadMarksheet
);

// Verification management
router.delete("/verification/:id", cancelProfileVerification);

// F08 - Jobs & Applications
router.get("/jobs", listEligibleJobs);
router.get("/jobs/:id", getEligibleJob);
router.post("/jobs/:id/apply", applyToJob);
router.get("/applications", listMyApplications);

export default router;
