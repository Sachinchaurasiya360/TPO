import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth";
import {
  getStats,
  listPendingRegistrations,
  approveRegistration,
  rejectRegistration,
} from "../controller/admin.controller";
import {
  listFaculty,
  getFacultyDetail,
  createFaculty,
  updateFaculty,
  setUserStatus,
} from "../controller/admin.faculty.controller";
import {
  listStudents,
  getStudentDetail,
  graduateStudent,
} from "../controller/admin.students.controller";
import {
  createJob,
  listJobs,
  getJob,
  updateJob,
  setJobStatus,
  listApplications,
  updateApplicationStatus,
} from "../controller/admin.jobs.controller";
import {
  createEvent,
  listEvents,
  updateEvent,
  cancelEvent,
  deleteEvent,
} from "../controller/admin.events.controller";

const router = express.Router();

router.use(isAuthenticated, isAdmin);

// Overview
router.get("/stats", getStats);

// Registrations (pending signups)
router.get("/registrations", listPendingRegistrations);
router.post("/registrations/:id/approve", approveRegistration);
router.post("/registrations/:id/reject", rejectRegistration);

// Faculty
router.get("/faculty", listFaculty);
router.get("/faculty/:id", getFacultyDetail);
router.post("/faculty", createFaculty);
router.patch("/faculty/:id", updateFaculty);

// Students / alumni
router.get("/students", listStudents);
router.get("/students/:id", getStudentDetail);
router.post("/students/:id/graduate", graduateStudent);

// Generic user status toggle (active/inactive)
router.patch("/users/:id/status", setUserStatus);

// Jobs
router.get("/jobs", listJobs);
router.post("/jobs", createJob);
router.get("/jobs/:id", getJob);
router.patch("/jobs/:id", updateJob);
router.patch("/jobs/:id/status", setJobStatus);
router.get("/jobs/:id/applications", listApplications);
router.patch("/applications/:id/status", updateApplicationStatus);

// Events
router.get("/events", listEvents);
router.post("/events", createEvent);
router.patch("/events/:id", updateEvent);
router.post("/events/:id/cancel", cancelEvent);
router.delete("/events/:id", deleteEvent);

export default router;
