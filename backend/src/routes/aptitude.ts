import express from "express";
import {
  isAuthenticated,
  isFacultyOrAdmin,
  isStudent,
} from "../middleware/auth";
import {
  facultyListTests,
  facultyGetTest,
  createTest,
  updateTest,
  setTestStatus,
  deleteTest,
  listTestSubmissions,
  reviewSubmission,
  studentListAvailableTests,
  studentStartTest,
  studentSubmitTest,
  studentGetMyResult,
} from "../controller/aptitude.controller";

const router = express.Router();

router.use(isAuthenticated);

// Faculty / admin: manage tests
router.get("/faculty/tests", isFacultyOrAdmin, facultyListTests);
router.post("/faculty/tests", isFacultyOrAdmin, createTest);
router.get("/faculty/tests/:id", isFacultyOrAdmin, facultyGetTest);
router.patch("/faculty/tests/:id", isFacultyOrAdmin, updateTest);
router.delete("/faculty/tests/:id", isFacultyOrAdmin, deleteTest);
router.post("/faculty/tests/:id/status", isFacultyOrAdmin, setTestStatus);

// Faculty / admin: review submissions
router.get(
  "/faculty/tests/:id/submissions",
  isFacultyOrAdmin,
  listTestSubmissions
);
router.post(
  "/faculty/submissions/:id/review",
  isFacultyOrAdmin,
  reviewSubmission
);

// Student: take tests
router.get("/student/tests", isStudent, studentListAvailableTests);
router.post("/student/tests/:id/start", isStudent, studentStartTest);
router.post("/student/submissions/:id/submit", isStudent, studentSubmitTest);
router.get("/student/submissions/:id", isStudent, studentGetMyResult);

export default router;
