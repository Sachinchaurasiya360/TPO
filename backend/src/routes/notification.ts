import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  listNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controller/notification.controller";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", listNotifications);
router.get("/unread-count", getUnreadCount);
router.post("/:id/read", markAsRead);
router.post("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
