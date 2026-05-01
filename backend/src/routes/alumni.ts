import express from "express";
import { isAuthenticated, isAlumni } from "../middleware/auth";
import {
  getMyAlumniProfile,
  updateAlumniProfile,
  addPastOrg,
  deletePastOrg,
  upsertHigherStudies,
  deleteHigherStudies,
  createPost,
  listMyPosts,
  deletePost,
  listFeed,
  listDirectory,
  getAlumniById,
} from "../controller/alumni.controller";

const router = express.Router();

// All routes require auth; reads are open to every role, writes are alumni-only
router.use(isAuthenticated);

router.get("/feed", listFeed);
router.get("/directory", listDirectory);
router.get("/by/:id", getAlumniById);

router.get("/me", isAlumni, getMyAlumniProfile);
router.patch("/me", isAlumni, updateAlumniProfile);

router.post("/me/past-orgs", isAlumni, addPastOrg);
router.delete("/me/past-orgs/:id", isAlumni, deletePastOrg);

router.put("/me/higher-studies", isAlumni, upsertHigherStudies);
router.delete("/me/higher-studies", isAlumni, deleteHigherStudies);

router.post("/me/posts", isAlumni, createPost);
router.get("/me/posts", isAlumni, listMyPosts);
router.delete("/me/posts/:id", isAlumni, deletePost);

export default router;
