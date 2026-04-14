import express from "express";
import { listUpcomingEvents } from "../controller/public.controller";

const router = express.Router();

router.get("/events", listUpcomingEvents);

export default router;
