import express from "express";
import { isAuthenticated, isStudent } from "../middleware/auth";
import { imageUpload, profilePicUpload, pdfUpload, handleUploadError } from "../middleware/upload";
import {
  getProfile,
  updateProfile,
  uploadProfilePic,
  uploadResume,
  uploadCertificate,
} from "../controller/student.controller";
import { getMarks, updateMarks, uploadMarksheet } from "../controller/marks.controller";
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
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller";
import {
  listCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controller/certificate.controller";
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
  profilePicUpload.single("file"),
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
router.post(
  "/marks/upload/:field",
  pdfUpload.single("file"),
  handleUploadError,
  uploadMarksheet
);

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

// Projects
router.get("/projects", listProjects);
router.post("/projects", createProject);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Generic uploads (returns { url })
router.post(
  "/uploads/certificate",
  pdfUpload.single("file"),
  handleUploadError,
  uploadCertificate
);

// Certificates
router.get("/certificates", listCertificates);
router.post("/certificates", createCertificate);
router.patch("/certificates/:id", updateCertificate);
router.delete("/certificates/:id", deleteCertificate);

// F08 - Jobs & Applications
router.get("/jobs", listEligibleJobs);
router.get("/jobs/:id", getEligibleJob);
router.post("/jobs/:id/apply", applyToJob);
router.get("/applications", listMyApplications);

export default router;
