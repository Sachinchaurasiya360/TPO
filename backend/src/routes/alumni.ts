import express from "express";
import { isAuthenticated, isAlumni } from "../middleware/auth";

const router = express.Router();

router.use(isAuthenticated, isAlumni);

// Route handlers will be added here during Phase P2 feature implementation
// F11: alumni profile, career tracking, posts (mentorship/referrals)

export default router;
