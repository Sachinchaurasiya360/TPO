import express from "express";
import { isAuthenticated, isFaculty, isHOD } from "../middleware/auth";
import {
  getFacultyStats,
  listPendingVerifications,
  reviewVerificationRequest,
  reviewInternship,
  reviewAchievement,
  listDeptStudents,
  getDeptStudentDetail,
  listDeptAlumni,
} from "../controller/faculty.controller";
import {
  listDeptFaculty,
  updateDeptFaculty,
  setDeptFacultyStatus,
} from "../controller/faculty.hod.controller";
import {
  listStudentNotes,
  addStudentNote,
  deleteStudentNote,
} from "../controller/notes.controller";

const router = express.Router();

router.use(isAuthenticated, isFaculty);

// Overview
router.get("/stats", getFacultyStats);

// Verification queue
router.get("/verifications", listPendingVerifications);
router.post("/verifications/:id/review", reviewVerificationRequest);
router.post("/internships/:id/review", reviewInternship);
router.post("/achievements/:id/review", reviewAchievement);

// Department students
router.get("/students", listDeptStudents);
router.get("/students/:id", getDeptStudentDetail);

// Department alumni
router.get("/alumni", listDeptAlumni);

// Student notes
router.get("/students/:id/notes", listStudentNotes);
router.post("/students/:id/notes", addStudentNote);
router.delete("/students/:id/notes/:noteId", deleteStudentNote);

// HOD-only
router.get("/hod/faculty", isHOD, listDeptFaculty);
router.patch("/hod/faculty/:id", isHOD, updateDeptFaculty);
router.patch("/hod/faculty/:id/status", isHOD, setDeptFacultyStatus);

export default router;
